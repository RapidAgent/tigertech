//Send this to: sigmyers@gmail.com
var pennant = angular.module('pennant',[]);


////////// ROUTING /////////////////////////

pennant.config(function ($routeProvider) {
	
	$routeProvider
		.when('/categories', { controller: 'CategoryController', templateUrl: 'view/CategoryControllerView.html'})
		.when('/categories/:category/articles', { controller: 'ArticlesController', templateUrl: 'view/ArticlesControllerView.html'})
        .when('/categories/:category/articles/:year/:month/:day/:title',
            {controller: 'ArticleController', templateUrl: 'view/ArticleControllerView.html'})
		.otherwise( {redirectTo: '/categories'} ); 
});		

///////// CONTROLERS ////////////////////////////

pennant.controller('CategoryController', function($scope, categoriesFactory)
{
    $scope.categories = [];
	init();
	function init()
    { $scope.categories = categoriesFactory.getCategories(); }	
});

pennant.controller('ArticlesController', function($scope, $http, $routeParams, articlesFactory)
{
	console.log('Category ID: ' + $routeParams.category);
    $scope.articles = [];
	init();
	function init()
    {
        console.log('URL parameter passed: ' + $routeParams.category);

        var url = 'https://pennant.squarespace.com/articles/?callback=JSON_CALLBACK&format=json&category=' + $routeParams.category;
        $http.jsonp(url)
            .success(function(data, status, headers, config) {
                $scope.articles = articlesFactory.getArticles(data);
                $scope.category = $routeParams.category;
            }).
            error(function(data, status, headers, config) {
                $scope.articles = [];
            });
    }
});

pennant.controller('ArticleController', function($scope, $http, $routeParams, articleFactory)
{
    $scope.article = {};

    var url = 'https://pennant.squarespace.com/' + $routeParams.year + '/' +
                                                   $routeParams.month + '/' +
                                                   $routeParams.day + '/' +
                                                   $routeParams.title + '?callback=JSON_CALLBACK&format=json';
    $http.jsonp(url)
        .success(function(data, status, headers, config) {
            $scope.article = articleFactory.getArticle(data);
            $scope.category = $routeParams.category;

        }).
        error(function(data, status, headers, config) {
            $scope.article = [];
        });
});
    
///////////// FACTORIES ////////////////////////////

pennant.factory('categoriesFactory', function($http){
    var categories = [
        {id:1, name:"Editorials", categoryName: 'Editorials', image:'featured.png'},
        {id:2, name:"Government", categoryName: 'World Events', image:'government.png'},
        {id:3, name:"School Info", categoryName: 'school info', image:'about.png'},
        {id:4, name:"Sports", categoryName: 'Sports', image:'sports.png'},
        {id:5, name:"Entertainment", categoryName: 'Entertainment', image:'art.png'},
        {id:6, name:"Health and Beauty", categoryName: 'Health', image:'health_beauty.png'}
    ];
    var factory = {};
    factory.getCategories = function()
    {
        return categories;
    };
    return factory;
});

pennant.factory('articlesFactory', function(){
    var articles = [];
    var factory = {};
    factory.getArticles = function(articlesJson)
    {
        for(var x=0; x<articlesJson.items.length; x++)
        {
            articles[x] = articlesJson.items[x];
            console.log(articles[x]);
        }

        articles[0].name = articlesJson;
        return articles;
    };
    return factory;
});

pennant.factory('articleFactory', function(){
	var article;
    var factory = {};
    factory.getArticle = function(articleJson)
    {
        console.log('here is my article!');
        article = articleJson.item;
        article.body = article.body.split('data-src').join('src');
        return article
    };
    return factory;
});