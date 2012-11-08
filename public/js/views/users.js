define(["chat", "views/chatinput", "underscore", "backbone"], function(chat, chatinput) {
	var View = Backbone.View.extend({
		el: $("#users-list"),
		events: {
			"click": "getUsers"
		},
		submitform: function() {
			$('#chatinput').val("..room " + input.val());
			return false;
		},
		initialize: function() {
			var that = this;
			chat.on("onSys", function(msg) {
				if(msg.cmd == "users") that.onUsers(msg.msg);
			})
			//this.rooms_list.click(_.bind(this.getRooms,this));
		},
		selectUser: function(user) {

			return true;
		},
		users_list: [],
		onUsers: function(data) {
			data = data.split(" ");
			data.pop();

			//alert(data);
			//========= drop down
			this.el = $("#users-list");
			this.el.empty();
			var len = 0;
			for(var key in data) {
				len++
				var val = data[key];
				var node = $('<li><a>' + val + '</a></li>');
				node.find('a').click(_.bind(this.selectUser, this, val));

				this.el.append(node);
			}
			$('.num_users').html(len);

			//========== chat typeahead
			/*
				require(["views/chatinput"], function(chatinput){
					for(var key in source) source[key] = "..room "+source[key];
					chatinput.setTypeahead("rooms", source);
				});
				*/
		},
		getUsers: function() {
			chatinput.setInput("..users", true);
			//chat.trigger("say", "..users");
			return true;
		}
	})

	var view = new View();
	require(["chat"], function(chat) {
		chat.on("onSys", function(msg) {
			if(msg.cmd == "joined") view.getRooms();
			if(msg.cmd == "left") view.getRooms();
		});
	});
	return view;
})