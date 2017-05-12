const summary = require('../models').summary;
const officer = require('../models').officer;
const tengible = require('../models').tengible_asset;
const tengible_estate = require('../models').tengible_estate_asset;
const financial = require('../models').financial_asset;
const liability = require('../models').liability_asset;

module.exports = {
    retrieve(req, res){
        return officer.find({
            where: { id: req.params.keyword},
            include: [
                {
                    model: tengible_estate,
                    required: false,
                    where: { officer_id: req.params.keyword }
                },
                {
                    // 자동차 정보만 수집
                    model: tengible,
                    required: false,
                    where: { officer_id: req.params.keyword, category: 13 }
                },
                {
                    // 예금 정보만 수집
                    model: financial,
                    required: false,
                    where: { officer_id: req.params.keyword, category: 27 }
                },
                {
                    model: liability,
                    required: false,
                    where: { officer_id: req.params.keyword }
                },
                {
                    model: summary,
                    required: false,
                    where: { officer_id: req.params.keyword }
                },
            ]
        })
        .then(officer => res.status(200).send(officer))
        .catch(error => res.status(400).send(error));    
    },
    list(req, res){
        var keyword = req.params.keyword;
        if(keyword !='-' && 0 < keyword.length){
            return summary
            .findAll(
                { 
                    where:{
                        $or:[
                            {name: { $like: '%'+keyword+'%'}},
                            {organization: { $like: '%'+keyword+'%'}},
                            {division: { $like: '%'+keyword+'%'}},
                            {job_title: { $like: '%'+keyword+'%'}},
                        ]
                    },
                    order: req.params.order_by + ' DESC',
                    offset:req.params.paging, 
                    limit:4
                    
                })
            .then(summary => res.status(200).send(summary))
            .catch(error => res.status(400).send(error));    
        }else{
            return summary
            .findAll(
                { 
                    order: req.params.order_by + ' DESC',
                    offset:req.params.paging, 
                    limit:4
                    
                })
            .then(summary => res.status(200).send(summary))
            .catch(error => res.status(400).send(error));
        }
        
    },
    listByTotal(req, res){
        return summary
        .findAll(
            { 
                order: 'totals DESC',
                attributes: ['officer_id', 'name', 'totals','job_title']
            }
        )
        .then(summary => res.status(200).send(summary))
        .catch(error => res.status(400).send(error));
        
    },
    create(req, res) {
        return summary
            .create({
                organization: req.body.organization,
                division: req.body.division,
                type_of_property: req.body.type_of_property,
                job_title: req.body.job_title,
                name: req.body.name,
                totals: req.body.totals,
                tengibles: req.body.tengibles,
                tengible_estates: req.body.tengible_estates,
                tengible_estate_amounts: req.body.tengible_estate_amounts,
                financials: req.body.financials,
                relations: req.body.relations,
                fluctuates: req.body.fluctuates,
                year_of_investigating: req.body.year_of_investigating,
                officer_id: req.body.officer_id,
            })
            .then(summary => res.status(201).send(summary))
            .catch(error => res.status(400).send(error));
    },
};