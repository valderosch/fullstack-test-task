const Superhero = require('../models/heroModel');

class HeroService {
    getAllHeroes = async (page, limit) => {
        const skip = (page - 1) * limit;
        const heroes = await Superhero.find().skip(skip).limit(limit);
        const total = await Superhero.countDocuments();
        return { heroes, total };
    };

    getHeroById = async (id) => {
        return await Superhero.findById(id);
    };

    createNewHero = async (data, files) => {
        const imagePaths = files ? files.map(file => `/uploads/${file.filename}`) : [];
        const newHero = new Superhero({ ...data, images: imagePaths });
        return await newHero.save();
    };

    updateHero = async (id, data, files) => {
        const imagePaths = files ? files.map(file => `/uploads/${file.filename}`) : [];
        const updateData = { ...data };
        if (imagePaths.length) updateData.images = imagePaths;

        return await Superhero.findByIdAndUpdate(id, updateData, { new: true });
    };

    deleteHeroById = async (id) => {
        return await Superhero.findByIdAndDelete(id);
    };
}

module.exports = HeroService;