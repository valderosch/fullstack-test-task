const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    nickname: { type: String, required: true},
    real_name: { type: String, required: true, min: 2},
    origin_description: { type: String, required: true, min: 3},
    power_abilities: { type: String, required: true},
    catch_phrase: { type: String, required: true},
    images_links: { type: [String], default: [] }
}, { timestamps: true });

module.exports =  mongoose.model('HeroElement', heroSchema);
