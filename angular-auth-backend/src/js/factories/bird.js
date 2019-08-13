angular
  .module('birdApp')
  .factory('Bird', Bird);

Bird.$inject = ['$resource'];
function Bird($resource) {
  return new $resource('/api/birds/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}