const officer = require('../models').officer;
const financial = require('../models').financial_asset;

module.exports = {
    retrieve(req, res){
        return financial
            .findById(req.params.officer_id)
            .then(officer => res.status(200).send(officer))
            .catch(error => res.status(400).send(error));
    },
    list(req, res){
        var year_of_investigating = req.params.year_of_investigating;
        return officer
            // .all()
            .findAll({
                where: { year_of_investigating: year_of_investigating}
            })
            .then(officer => res.status(200).send(officer))
            .catch(error => res.status(400).send(error));
    },
    create(req, res) {
        return officer
            .create({
                organization: req.body.organization,
                division: req.body.division,
                job_title: req.body.job_title,
                name: req.body.name,
                year_of_investigating : req.body.year_of_investigating
            })
            .then(officer => res.status(201).send(officer))
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return officer
            .findById(req.params.officer_id)    
            .then( officer =>{
                return officer
                    .update({
                        organization: req.body.organization,
                        division: req.body.division,
                        job_title: req.body.job_title,
                        name: req.body.name,
                    })
                    .then(() => res.status(201).send(officer))
                    .catch((error) => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return officer
            .findById(req.params.officer_id)    
            .then( officer =>{
                return officer
                    .destroy()
                    .then(() => res.status(201).send({ message: 'Officer deleted successfully.' }))
                    .catch((error) => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};