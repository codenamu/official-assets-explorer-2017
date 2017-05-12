const tengible_estate = require('../models').tengible_estate_asset;

module.exports = {
    list(req, res){
        return tengible_estate
            .all()
            .then(officer => res.status(200).send(officer))
            .catch(error => res.status(400).send(error));
    },
    create(req, res) {
        return tengible_estate
            .create({
                category: req.body.category,
                relation: req.body.relation,
                type_of_property: req.body.type_of_property,
                description: req.body.description,
                previous_price: req.body.previous_price,
                increase_price: req.body.increase_price,
                increase_deal_price: req.body.increase_deal_price,
                decrease_price: req.body.decrease_price,
                decrease_deal_price: req.body.decrease_deal_price,
                present_price: req.body.present_price,
                reason_for_change: req.body.reason_for_change,
                year_of_investigating: req.body.year_of_investigating,
                officer_id: req.body.officer_id,
            })
            .then(officer => res.status(201).send(officer))
            .catch(error => res.status(400).send(error));
    },
};