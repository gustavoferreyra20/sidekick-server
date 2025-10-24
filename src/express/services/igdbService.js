const axios = require('axios');
const IGDBQueryBuilder = require('./igdb/queryBuilder');
const { IGDB_CONFIG, MULTIPLAYER_MODES } = require('./igdb/constants');

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
      fields,
      sortBy = IGDB_CONFIG.DEFAULT_SORT_FIELD,
      sortOrder = IGDB_CONFIG.DEFAULT_SORT_ORDER
    } = options;

    const query = IGDBQueryBuilder.create()
      .fields(fields)
      .gameModes(gameModes)
      .sort(sortBy, sortOrder)
      .limit(limit)
      .offset(offset)
      .build();

    return await this.makeRequest('games', query);
  }

  /**
   * Search games by name
   * @param {string} searchTerm - Search term
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of games
   */
  async searchGames(searchTerm, options = {}) {
    const { limit, offset, fields } = options;

    let query = IGDBQueryBuilder.create()
      .fields(fields)
      .limit(limit)
      .offset(offset);

    // Add search manually since it's not part of the standard query builder
    const builtQuery = query.build();
    const finalQuery = builtQuery.replace(
      /^fields ([^;]+);/, 
      `fields $1;\nsearch "${searchTerm}";`
    );

    return await this.makeRequest('games', finalQuery);
  }

  /**
   * Get games by specific criteria using query builder
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of games
   */
  async getGames(options = {}) {
    const { 
      limit, 
      offset, 
      whereConditions = [], 
      fields,
      sortBy,
      sortOrder 
    } = options;

    let queryBuilder = IGDBQueryBuilder.create()
      .fields(fields)
      .limit(limit)
      .offset(offset);

    // Add custom where conditions
    whereConditions.forEach(condition => {
      queryBuilder.where(condition);
    });

    // Add sorting if specified
    if (sortBy) {
      queryBuilder.sort(sortBy, sortOrder);
    }

    const query = queryBuilder.build();
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
}

module.exports = new IGDBService();