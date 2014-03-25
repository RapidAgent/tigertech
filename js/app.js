//Send this to: sigmyers@gmail.com
var pennant = angular.module('pennant',[]);


////////// ROUTING /////////////////////////

pennant.config(function ($routeProvider) {
	
	$routeProvider
		.when('/categories', { controller: 'CategoryController', templateUrl: 'view/CategoryControllerView.html'})
		.when('/categories/:category/articles', { controller: 'ArticlesController', templateUrl: 'view/ArticlesControllerView.html'})
		.when('/categories/:category/articles/:article', {controller: 'ArticleController', templateUrl: 'view/ArticleControllerView.html'})
		.otherwise( {redirectTo: '/categories'} ); 
});		

///////// CONTROLERS ////////////////////////////

pennant.controller('CategoryController', function($scope,categoriesFactory)
{
    $scope.categories = [];
	init();
	function init()
    { $scope.categories = categoriesFactory.getCategories(); }	
});

pennant.controller('ArticlesController', function($scope, $routeParams, articlesFactory)
{
	console.log('Category ID: ' + $routeParams.category);
    $scope.articles = [];
	init();
	function init()
    { $scope.articles = articlesFactory.getArticles(); }	
});

pennant.controller('ArticleController', function($scope, $routeParams, articleFactory)
{
	console.log('Category ID: ' + $routeParams.category);
	console.log('Article ID: ' + $routeParams.article);
    $scope.article = {};
	init();
	function init()
    { $scope.articles = articlesFactory.getArticle(); }	
});
    
///////////// FACTORIES ////////////////////////////

pennant.factory('categoriesFactory', function(){
    var categories = [
        {name:'Front Page', image:'', advertisement:''},
        {name:'Editorials', image:'', advertisement:''},
        {name:'Sports', image:'', advertisement:''},
        {name:'Arts', image:'', advertisement:''}
    ];
    var factory = {};
    factory.getCategories = function()
    {
        return categories; //This is where we well API call out to Squarespace
    }
    return factory;
});

pennant.factory('articlesFactory', function(){
	// Squarespace URL example: https://pennant.squarespace.com/?format=json&category=Health
    var articles = [
        {name:'Article 1', image:'', advertisement:'', fullUrl=''},
        {name:'Article 2', image:'', advertisement:'', fullUrl=''},
        {name:'Article 3', image:'', advertisement:'', fullUrl=''},
        {name:'Article 4', image:'', advertisement:'', fullUrl=''}
    ];
    var factory = {};
    factory.getArticles = function()
    {
        return articles; //This is where we well API call out to Squarespace
    }
    return factory;
});

pennant.factory('articleFactory', function(){
	//https://pennant.squarespace.com/articles/2014/2/3/tiger-pride-of-instagram?format=json
	var article = {'id':'234', 'author':'John Doe'};
    var factory = {};
    factory.getArticle = function()
    {
        return article; //This is where we well API call out to Squarespace
    }
    return factory;
});
    
