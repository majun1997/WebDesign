'use strict';
const mongoose = require('mongoose');
const artworks = mongoose.model('artworks');
const memberService = require('../services/member-services');

/**
 *
 *
 * @param {*} params
 * @returns
 */
exports.search = function (params) {
    const promise = artworks.find(params).exec();
    return promise;
};
/**
 *
 *
 * @param {*} params
 * @returns
 */
exports.get = function (params) {
    const promise = artworks.findById(params).exec();
    return promise
};

/**
 *
 *
 * @param {*} add
 * @returns
 */
exports.create = function (add) {    
    const newartworks=new artworks(add)
    const promise = newartworks.save(newartworks);
    return promise;
};

/**
 *
 *
 * @param {*} artworkID
 * @param {*} update_content
 * @returns
 */
exports.update =function(artworkID, update_content){
    const promise = artworks.findByIdAndUpdate(artworkID, update_content).exec();
    return promise;
}

/**
 *
 *
 * @param {*} artwork
 * @param {*} authorId
 * @returns
 */
exports.newArtwork= (artwork, authorId) => {
    const promise = artworks.create(artwork)
                    .then((newArtwork) => {
                        memberService.AddArtwork(newArtwork, authorId)
                    })
    return promise;
}
exports.delete = function (artworkid) {
    const promise = artworks.remove({_id: artworkid});
    return promise;
};
