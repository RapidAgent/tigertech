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
        // TODO: Talk with Tiger Tech about this piece of gold.
        console.log('URL parameter passed: ' + $routeParams.category);

        var url = 'https://pennant.squarespace.com/articles/?callback=JSON_CALLBACK&format=json&category=' + $routeParams.category;
        $http.jsonp(url)
            .success(function(data, status, headers, config) {
                $scope.articles = articlesFactory.getArticles(data);

            }).
            error(function(data, status, headers, config) {
                $scope.articles = [];
            });
    }
});

pennant.controller('ArticleController', function($scope, $routeParams, articleFactory)
{
	console.log('Category ID: ' + $routeParams.category);
	console.log('Article ID: ' + $routeParams.article);
    console.log($routeParams);
    $scope.article = {};

    var url = 'https://pennant.squarespace.com/' + $routeParams.articleUri + '?callback=JSON_CALLBACK&format=json';
    $http.jsonp(url)
        .success(function(data, status, headers, config) {
            console.log(data);
            $scope.articles = articlesFactory.getArticles(data);

        }).
        error(function(data, status, headers, config) {
            $scope.articles = [];
        });

	init();
	function init()
    { $scope.articles = articlesFactory.getArticle(); }	
});
    
///////////// FACTORIES ////////////////////////////

pennant.factory('categoriesFactory', function($http){
    //ToDo: Match Articles with categories in Squarespace
    var categories = [
        {id:1, name:"Editorials", image:'featured.png', advertisement:''},
        // ToDo: Figure out what the article names are
        {id:2, name:"About", image:'about.png', advertisement:''},
        {id:3, name:"Sports", image:'sports.png', advertisement:''},
        {id:4, name:"Arts", image:'art.png', advertisement:''},
        {id:5, name:"Health and Beauty", image:'health_beauty.png', advertisement:''}
    ];
    var factory = {};
    factory.getCategories = function()
    {
        return categories; //This is where we well API call out to Squarespace
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
	var article = {'id':'234', 'author':'John Doe'};
    var factory = {};
    factory.getArticle = function(articleUri)
    {
        return article; //This is where we well API call out to Squarespace
    };
    return factory;
});