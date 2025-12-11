const axios = require('axios');
const IGDBQueryBuilder = require('./igdb/queryBuilder');
const { IGDB_CONFIG, MULTIPLAYER_MODES, VALID_GAME_TYPE } = require('./igdb/constants');

class IGDBService {
  constructor() {
    this.baseUrl = IGDB_CONFIG.BASE_URL;
    this.clientId = process.env.IGDB_CLIENT_ID;
    this.accessToken = process.env.IGDB_ACCESS_TOKEN;
  }

  /**
   * Validates IGDB credentials
   * @returns {boolean} true if credentials are valid
   */
  validateCredentials() {
    return !!(this.clientId && this.accessToken);
  }

  /**
   * Makes a request to IGDB API
   * @param {string} endpoint - IGDB endpoint (e.g., 'games', 'platforms')
   * @param {string} query - IGDB query string
   * @returns {Promise<Object>} API response
   */
  async makeRequest(endpoint, query) {
    if (!this.validateCredentials()) {
      throw new Error('IGDB credentials not configured');
    }

    try {
      const response = await axios({
        method: 'POST',
        url: `${this.baseUrl}/${endpoint}`,
        headers: {
          'Client-ID': this.clientId,
          'Authorization': `Bearer ${this.accessToken}`,
          'Accept': 'application/json',
          'Content-Type': 'text/plain'
        },
        data: query
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        const errorDetails = typeof error.response.data === 'object' 
          ? JSON.stringify(error.response.data) 
          : error.response.data;
        throw new Error(`IGDB API error: ${error.response.status} - ${errorDetails}`);
      } else if (error.request) {
        throw new Error('IGDB API error: No response received');
      } else {
        throw new Error(`IGDB API error: ${error.message}`);
      }
    }
  }

  /**
   * Get multiplayer games from IGDB
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of games
   */
  async getMultiplayerGames(options = {}) {
    const {
      limit = IGDB_CONFIG.DEFAULT_LIMIT,
      offset = IGDB_CONFIG.DEFAULT_OFFSET,
      gameModes = MULTIPLAYER_MODES,
      gameType = VALID_GAME_TYPE,
      fields,
      sortBy = IGDB_CONFIG.DEFAULT_SORT_FIELD,
      sortOrder = IGDB_CONFIG.DEFAULT_SORT_ORDER,
      ...restOptions
    } = options;

    return await this.getGames({
      gameModes,
      gameType,
      fields,
      limit,
      offset,
      sortBy,
      sortOrder,
      ...restOptions
    });
  }

  /**
   * Search games by ID or name
   * @param {Object} options - Query options
   * @param {number} options.id - Game ID (nullable)
   * @param {string} options.name - Game name (nullable)
   * @param {number} options.limit - Results limit (default: 1)
   * @returns {Promise<Array>} Array of games
   */
  async searchGames(options = {}) {
    const { 
      id, 
      name, 
      limit = 1,
      fields = 'name, summary, rating, platforms.name, cover.image_id, game_modes.name',
      ...restOptions 
    } = options;

    return await this.getGames({
      id,
      name,
      fields,
      limit,
      ...restOptions
    });
  }

  /**
   * Get games by specific criteria - unified method for all game queries
   * @param {Object} options - Query options
   * @param {number} options.id - Game ID (nullable)
   * @param {string} options.name - Game name (nullable) 
   * @param {Array} options.gameModes - Game modes to filter by (nullable)
   * @param {Array} options.whereConditions - Additional where conditions (nullable)
   * @param {string|Array} options.fields - Fields to return
   * @param {number} options.limit - Results limit
   * @param {number} options.offset - Results offset
   * @param {string} options.sortBy - Sort field
   * @param {string} options.sortOrder - Sort order (asc/desc)
   * @returns {Promise<Array>} Array of games
   */
  async getGames(options = {}) {
    const { 
      id,
      name,
      gameModes,
      gameType,
      whereConditions = [], 
      fields,
      limit,
      offset,
      sortBy,
      sortOrder 
    } = options;

    // Build query using method chaining and filter out undefined values
    const queryBuilder = IGDBQueryBuilder.create()
      .fields(fields)
      .limit(limit)
      .offset(offset);

    // Build conditions array and filter out falsy values
    const allConditions = [
      id && `id = ${id}`,
      name && `name ~ *"${name}"*`,
      'platforms != null',  // Ensure games have platforms
      ...whereConditions
    ].filter(Boolean);

    // Add all conditions at once
    allConditions.forEach(condition => queryBuilder.where(condition));

    // Add game modes and sorting using optional chaining style
    gameModes && queryBuilder.gameModes(gameModes);
    if (gameType !== undefined && gameType !== null) {
      queryBuilder.gameType(gameType);
    }
    sortBy && queryBuilder.sort(sortBy, sortOrder);

    const query = queryBuilder.build();
    console.log(query)
    return await this.makeRequest('games', query);
  }

  /**
   * Get total count of games matching criteria
   * @param {string} whereClause - Where clause for filtering
   * @returns {Promise<number>} Total count
   */
  async getGamesCount(whereClause = '') {
    let query = whereClause ? `where ${whereClause};\n` : '';
    query += 'count;';

    const result = await this.makeRequest('games', query);
    return result.count || 0;
  }

  /**
   * Get platforms by specific criteria
   * @param {Object} options - Query options
   * @param {number} options.id - Platform ID (nullable)
   * @param {string} options.name - Platform name (nullable) 
   * @param {number} options.limit - Results limit
   * @returns {Promise<Array>} Array of platforms
   */
  async searchPlatforms(options = {}) {
    const {
      id,
      name,
      limit = IGDB_CONFIG.DEFAULT_LIMIT
    } = options;

    const fields = 'abbreviation,alternative_name,category,checksum,created_at,generation,name,platform_family,platform_logo,platform_type,slug,summary,updated_at,url,versions,websites';
    let query = `fields ${fields};`;
    
    // Build where conditions based on provided parameters
    const conditions = [];
    
    if (id) {
      conditions.push(`id = ${id}`);
    }
    
    if (name) {
      conditions.push(`name ~ *"${name}"*`);
    }
    
    // Add where clause if any conditions exist
    if (conditions.length > 0) {
      query += ` where ${conditions.join(' & ')};`;
    }
    
    if (limit) {
      query += ` limit ${limit};`;
    }

    console.log('Platform query:', query);
    return await this.makeRequest('platforms', query);
  }

}

module.exports = new IGDBService();