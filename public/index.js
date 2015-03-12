var views = {}
var templates = {}

var Router = Backbone.Router.extend({

	routes: {
		"": "tableOfContents",
		"page/:pageNumber": "pageNumber"
	},

	tableOfContents: function() {
		$.ajax({
			url: "/api/toc",
			method: "GET",
			success: function(data) {
				views.contents.update(data)
				$("#content").html( views.contents.$el )
			}
		})
	},

	pageNumber: function(number) {
		$.ajax({
			url: "/api/page/" + number,
			method: "GET",
			success: function(data) {
				views.page.update(data)
				$("#content").html( views.page.$el )
			}
		})
	},

})

var router = new Router()

var ContentsView = Backbone.View.extend({

	initialize: function() {
		this.data = []
		this.render()
	},

	render: function() {
		console.log(this.data)
		this.$el.html( templates.contents(this.data) )
	},

	update: function(data) {
		this.data = {
			chapter: data
		}
		this.render()
	}

})

var PageView = Backbone.View.extend({

	initialize: function() {
		this.data = []
		this.render()
	},

	render: function() {
		this.$el.html( templates.page(this.data) )
	},

	update: function(data) {
		console.log(data)
		this.data = data
		this.render()
	}

})


$(document).on("ready", function() {

	templates = {
		contents: Handlebars.compile( $("#contents-template").text() ),
		page: Handlebars.compile( $("#page-template").text() )
	}

	views.contents = new ContentsView()
	views.page = new PageView()

	Backbone.history.start()
})