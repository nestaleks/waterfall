var globalMouseX = 0, globalMouseY = 0;
var is_ie = ( document.all ? true : false); 
var current_drag_win = null;
var current_drag_obj = null;
var current_drag_obj_left_offs = 0;
var current_drag_obj_top_offs = 0;

function FixCurrentMousePos(evt)
{
	globalMouseX = ( is_ie ? event.clientX : evt.pageX );
	globalMouseY = ( is_ie ? event.clientY : evt.pageY );
	
	if(current_drag_win!=null)
		MoveDrag();
}

document.onmousemove = FixCurrentMousePos;

function StartDrag(id)
{
	current_drag_win = id;
	current_drag_obj = document.getElementById(id);
	if(current_drag_obj != undefined)
	{
		current_drag_obj_left_offs = globalMouseX - parseInt(current_drag_obj.style.left);
		current_drag_obj_top_offs = globalMouseY - parseInt(current_drag_obj.style.top);
		
	}
	current_drag_obj.style.cursor = "move";
}

function MoveDrag()
{
	
	if(current_drag_obj != undefined)
	{
		current_drag_obj.style.left = (globalMouseX - current_drag_obj_left_offs) + "px";
		current_drag_obj.style.top = (globalMouseY - current_drag_obj_top_offs) + "px";
	}
	if(is_ie) document.selection.clear( );
}

function StopDrag()
{
	if(current_drag_obj != undefined)
	{
		current_drag_obj.style.cursor = "auto";
		writeCookie( current_drag_win, parseInt(current_drag_obj.style.left)+"x"+parseInt(current_drag_obj.style.top) );
	}
		
	current_drag_win = null;
	current_drag_obj = undefined;
	current_drag_obj_left_offs = 0;
	current_drag_obj_top_offs = 0;
}

function hidePopUp(id)
{
	if(document.getElementById(id) != undefined)
	{
		document.getElementById(id).style.display = "none";
	}
}

function showPopUp(id)
{	
	if(document.getElementById(id) != undefined)
	{
		document.getElementById(id).style.display = "inline";
		if(document.getElementById(id).innerHTML == "") document.getElementById(id).innerHTML = "\r\n<"
+"table width=\"100%\" border=\"0\" style=\"height: 100%\" cellspacing=\"0\" cellpadding=\"0\""+">\r\n  <"
+"tr"+">\r\n    <"
+"td onMouseDown=\"StartDrag('pop_up_win');\" style=\"height:30px;\" onMouseUp=\"StopDrag();\" width=\"6\""+"><"
+"img src=\""+web_path+"Images/win-left-top.gif\" alt=\"\" width=\"6\" height=\"30\""+"><"+"/td"+">\r\n    <"
+"td onMouseDown=\"StartDrag('pop_up_win');\" width=\"100%\" onMouseUp=\"StopDrag();\" class=\"win_pop_top_grad\" style=\"height:30px;\" id=\"pop_up_title\" "+" >"+lang("messages")+"<"+"/td"+">\r\n    <"
+"td width=\"21\" align=\"right\"  class=\"win_pop_top_grad\" valign=\"middle\" style=\"padding-top:3px;\""+"><"
+"img onMouseOver=\"RollOver(this,'"+web_path+"Images/win-close.gif','"+web_path+"Images/win-close-over.gif')\" alt=\""+lang("close_window")+"\" onMouseOut=\"RollOut(this,'"+web_path+"Images/win-close.gif')\" src=\""+web_path+"Images/win-close.gif\" width=\"21\" height=\"21\" onClick=\"hidePopUp('pop_up_win');\""+"><"+"/td"+">\r\n    <"
+"td width=\"6\" style=\"height:30px;\""+"><"
+"img src=\""+web_path+"Images/win-right-top.gif\" alt=\"\" width=\"6\" height=\"30\""+"><"+"/td"+">\r\n  <"+"/tr"+">\r\n  <"
+"tr"+">\r\n    <"
+"td class=\"win_pop_left_grad popup_plane\" style=\"height: 100%\""+"><"
+"img src=\""+web_path+"Images/spacer.gif\" alt=\"sd\" width=\"6\" height=\"1\""+"><"+"/td"+">\r\n    <"
+"td colspan=\"2\" style=\"height: 100%\" class=\"pop_up_text popup_plane\" id=\"pop_up_text\""+"><"+"/td"+">\r\n    <"
+"td class=\"win_pop_right_grad popup_plane\" style=\"height: 100%\""+"><"
+"img src=\""+web_path+"Images/spacer.gif\" alt=\"rt\" width=\"6\" height=\"1\""+"><"+"/td"+">\r\n  <"+"/tr"+">\r\n  <"
+"tr"+">\r\n    <"
+"td"+"><"
+"img src=\""+web_path+"Images/win-left-bottom.gif\" alt=\"\" width=\"6\" height=\"6\""+"><"+"/td"+">\r\n    <"
+"td colspan=\"2\" style=\"height:6px;\" class=\"win_pop_bottom_grad popup_plane\""+"><"
+"img src=\""+web_path+"Images/spacer.gif\" width=\"1\" height=\"1\" alt=\"\""+"><"+"/td"+">\r\n    <"
+"td"+"><"
+"img src=\""+web_path+"Images/win-right-bottom.gif\" alt=\"\" width=\"6\" height=\"6\""+"><"+"/td"+">\r\n  <"+"/tr"+">\r\n<"+"/table"+">\r\n";
		if(document.getElementById('pop_up_text').innerHTML == "")
		{
			getMessages();
		}
	}
}

function writeCookie(name,value)
{
	var exp = new Date( );
	var nowPlusOneWeek = exp.getTime( ) + (365 * 24 * 60 * 60 * 1000);
	exp.setTime(nowPlusOneWeek);
	document.cookie = escape(name)+"=" + escape(value) +"; expires=" + exp.toGMTString() + "; path=" + getPath() + "; domain=" + document.domain.replace(/^www\./,".") + ";";
}

function getPath()
{
	return "/";
}

function readCookie(name)
{
	var cookies = document.cookie.split("; ");
	var params;
	
	for(var i=0; i<cookies.length; i++)
	{
		params = cookies[i].split("=");
		if(unescape(params[0]) == name)
			return unescape(params[1]);
	}
	
	return false;
}

function initAdminBlockPosition(id)
{
	if(readCookie(id))
	{
		var size = readCookie(id).split("x");
		document.getElementById(id).style.left = size[0] + "px";
		document.getElementById(id).style.top = size[1]  + "px";
	}
}