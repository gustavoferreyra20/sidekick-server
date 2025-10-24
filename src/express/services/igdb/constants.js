// IGDB API Configuration and Constants

const IGDB_CONFIG = {
  BASE_URL: 'https://api.igdb.com/v4',
  MAX_LIMIT: 500,
  DEFAULT_LIMIT: 20,
  DEFAULT_OFFSET: 0,
  DEFAULT_SORT_ORDER: 'desc',
  DEFAULT_SORT_FIELD: 'rating'
};

// Game Mode IDs
const GAME_MODES = {
  SINGLE_PLAYER: 1,
  MULTIPLAYER: 2,
  COOPERATIVE: 3,
  SPLIT_SCREEN: 4,
  MMO: 5
};

// Valid sort fields mapping (user-friendly name -> IGDB field name)
const SORT_FIELD_MAPPING = {
  'rating': 'rating',
  'name': 'name', 
  'release_date': 'first_release_date',
  'first_release_date': 'first_release_date',
  'aggregated_rating': 'aggregated_rating',
  'hypes': 'hypes',
  'created_at': 'created_at',
  'updated_at': 'updated_at'
};

// Valid sort orders
const SORT_ORDERS = ['asc', 'desc'];

// Default fields to return for games
const DEFAULT_GAME_FIELDS = [
  'name', 
  'summary', 
  'rating', 
  'platforms.name', 
  'cover.image_id',
  'game_modes'
];

// Multiplayer game modes (multiplayer + cooperative)
const MULTIPLAYER_MODES = [GAME_MODES.MULTIPLAYER, GAME_MODES.COOPERATIVE];

module.exports = {
  IGDB_CONFIG,
  GAME_MODES,
  SORT_FIELD_MAPPING,
  SORT_ORDERS,
  DEFAULT_GAME_FIELDS,
  MULTIPLAYER_MODES
};