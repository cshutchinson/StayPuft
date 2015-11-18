var hf = require('../helperFunctions.js');

var expect = require('chai').expect;


describe('elmiminateDuplicateArrayElements', function(){
  it('should return an array object', function(){
    expect(typeof hf.elmiminateDuplicateArrayElements([1, 2, 3]))
    .to.equal('object');
  });
  it('should return the unmodified array with unique elements', function(){
    expect(hf.elmiminateDuplicateArrayElements([1, 2, 3]))
    .to.deep.equal([1, 2, 3]);
  });
  it('should return a unique array when duplicates present', function(){
    expect(hf.elmiminateDuplicateArrayElements([1, 2, 2, 3]))
    .to.deep.equal([1, 2, 3]);
  });
  it('should return a unique array when duplicates present', function(){
    expect(hf.elmiminateDuplicateArrayElements([1, 1, 3, 4, 1, 2, 2, 3]))
    .to.deep.equal([1, 3, 4, 2]);
  });
});

describe('shuffleArrayElements', function(){
  console.log(hf.shuffleArrayElements([1, 2, 3, 4]));
  it('should reorder an array', function(){
    expect(hf.shuffleArrayElements([1, 2, 3, 4]))
    .to.not.deep.equal([1, 2, 3, 4]);
  });
  console.log(hf.shuffleArrayElements([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]));
  it('should reorder an array', function(){
    expect(hf.shuffleArrayElements([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]))
    .to.not.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  });

});
