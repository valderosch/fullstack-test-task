const HeroService = require("../services/heroService");

const heroService = new HeroService();

class HeroController {
    getHeroes = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 12;
            const { heroes, total } = await heroService.getAllHeroes(page, limit);
            res.json({ heroes, total, page, pages: Math.ceil(total / limit) });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    getHero = async (req, res) => {
        try {
            const hero = await heroService.getHeroById(req.params.id);
            if (!hero) return res.status(404).json({ message: 'Superhero not found' });
            res.json(hero);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    createHero = async (req, res) => {
        try {
            const hero = await heroService.createNewHero(req.body, req.files);
            res.status(201).json(hero);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    updateHero = async (req, res) => {
        try {
            const hero = await heroService.updateHero(req.params.id, req.body, req.files);
            if (!hero) return res.status(404).json(
                {
                    message: 'Superhero not found'
                });
            res.json(hero);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    deleteHero = async (req, res) => {
        try {
            const hero = await heroService.deleteHeroById(req.params.id);
            if (!hero) return res.status(404).json(
                {
                    message: 'Superhero not found by this id'
                });
            res.json(
                {
                    message: 'Superhero deleted successfully'
                });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

}

module.exports = HeroController;