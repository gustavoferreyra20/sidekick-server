const { 
  SORT_FIELD_MAPPING, 
  SORT_ORDERS, 
  DEFAULT_GAME_FIELDS,
  IGDB_CONFIG
} = require('./constants');

class IGDBQueryBuilder {
  constructor() {
    this.reset();
  }

  reset() {
    this._fields = [...DEFAULT_GAME_FIELDS];
    this._whereConditions = [];
    this._sortField = null;
    this._sortOrder = null;
    this._limit = IGDB_CONFIG.DEFAULT_LIMIT;
    this._offset = IGDB_CONFIG.DEFAULT_OFFSET;
    return this;
  }

  /**
   * Set fields to return
   * @param {Array<string>} fields - Array of field names
   */
  fields(fields) {
    if (fields && Array.isArray(fields)) {
      this._fields = fields;
    } else if (fields && typeof fields === 'string') {
      this._fields = [fields];
    }
    // If fields is undefined or empty, keep default fields
    return this;
  }

  /**
   * Add where condition
   * @param {string} condition - Where condition (e.g., "rating > 80")
   */
  where(condition) {
    this._whereConditions.push(condition);
    return this;
  }

  /**
   * Add game modes filter
   * @param {Array<number>} modes - Array of game mode IDs
   */
  gameModes(modes) {
    if (Array.isArray(modes) && modes.length > 0) {
      this._whereConditions.push(`game_modes = [${modes.join(',')}]`);
    }
    return this;
  }

  gameType(type) {
    if (type !== undefined && type !== null) {
      this._whereConditions.push(`game_type = ${type}`);
    }
    return this;
  }

  /**
   * Add sorting
   * @param {string} field - Field to sort by
   * @param {string} order - Sort order ('asc' or 'desc')
   */
  sort(field, order = 'desc') {
    // Validate and map sort field
    const actualField = SORT_FIELD_MAPPING[field.toLowerCase()] || IGDB_CONFIG.DEFAULT_SORT_FIELD;
    
    // Validate sort order
    const validOrder = SORT_ORDERS.includes(order.toLowerCase()) ? order.toLowerCase() : 'desc';
    
    this._sortField = actualField;
    this._sortOrder = validOrder;
    
    // Add null check for non-name fields
    if (actualField !== 'name') {
      this._whereConditions.push(`${actualField} != null`);
    }
    
    return this;
  }

  /**
   * Set limit
   * @param {number} limit - Number of results to return
   */
  limit(limit) {
    const parsedLimit = parseInt(limit);
    if (parsedLimit > 0 && parsedLimit <= IGDB_CONFIG.MAX_LIMIT) {
      this._limit = parsedLimit;
    }
    return this;
  }

  /**
   * Set offset
   * @param {number} offset - Number of results to skip
   */
  offset(offset) {
    const parsedOffset = parseInt(offset);
    if (parsedOffset >= 0) {
      this._offset = parsedOffset;
    }
    return this;
  }

  /**
   * Build the final IGDB query string
   * @returns {string} - IGDB query string
   */
  build() {
    let query = `fields ${this._fields.join(', ')};`;
    
    // Add where conditions
    if (this._whereConditions.length > 0) {
      query += `\nwhere ${this._whereConditions.join(' & ')};`;
    }
    
    // Add sorting
    if (this._sortField) {
      query += `\nsort ${this._sortField} ${this._sortOrder};`;
    }
    
    // Add pagination
    query += `\nlimit ${this._limit};`;
    query += `\noffset ${this._offset};`;
    
    return query;
  }

  /**
   * Static method to create a new query builder
   * @returns {IGDBQueryBuilder}
   */
  static create() {
    return new IGDBQueryBuilder();
  }
}

module.exports = IGDBQueryBuilder;