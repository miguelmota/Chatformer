var cf;
$(function() {
	cf = cf_app_api(onRdy, handleMsg);
});

function onRdy() {
	//alert("name " + cf.user.name);
	$("input[type='radio']").change(function() {
		var voteval = $("input[name=VoteGroup]:checked").val();
		cf.action('vote ' + voteval);
		return false;
	});
}

var voteData = {};
var usersVoted = {};
function handleMsg(msg) {
	if(msg.type!="app") return;
	var cmd = msg.cmd;
	var data = msg.msg;
	if (cmd == "vote") {
		if(usersVoted[msg.user]) {
			alert("already voted"); 
			return;
		}
		usersVoted[msg.user] = data;
		//alert("a "+data[1]);
		var c = voteData[data] || 0;
		voteData[data] = c + 1;

		var comp = $('#tally');
		comp.html('');
		for (var i in voteData) {
			comp.append(" " + i + " has " + voteData[i] +"# votes")
		}
		comp.append("<h5>Users:</h5>");
		for (var i in usersVoted) {
			comp.append(" " + i + " voted " + usersVoted[i])
		}
		//comp.append("</p>");
		cf.resize();
		//$("input[name=VoteGroup]").attr("disabled", "disabled"); // only for auth user
	}
}