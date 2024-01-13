"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _supabasejs = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = _supabasejs.createClient.call(void 0, supabaseUrl, supabaseKey);

exports. default = supabase;
