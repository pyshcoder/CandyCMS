var ckeditor_img_plugin=new Class({Implements:[Options,Events],options:{language:null,config:null},dialogDefinition:{},counter:1,selectcounter:1,uploadCounter:1,fancy:null,loadImage:null,search:null,editInput:null,editInputImg:null,editFileChange:null,mouseEnterElement:null,selectItem:null,inputCount:1,ckeditor:{},initialize:function(a){this.setOptions(a)},setDialogDefinition:function(a){this.dialogDefinition=a},setEditor:function(a){if(this.ckeditor!=a){this.ckeditor=a;this.setLink()}},getDir:function(b){if(b!=null&&b.get("text")!="/"){var c=b.getParent().getParent().getParent().get("id");c=c.split("_");c=c[3];var a=$("cke_span_"+c);return this.getDir(a)+b.get("text")+"/"}else{return""}},tryParent:function(a){var b=a.get("id");b=b.split("_");b=b[3];if(a.getChildren().getFirst().length!=0){if(!$("cke_dir_box_"+b).hasClass("hasDir")){$("cke_dir_box_"+b).addClass("hasDir open")}}else{if($("cke_dir_box_"+b).hasClass("hasDir")){$("cke_dir_box_"+b).removeClass("hasDir")}if($("cke_dir_box_"+b).hasClass("open")){$("cke_dir_box_"+b).removeClass("open")}}},editElement:function(e){if($("cke_im_"+e)!=null){var c=$("cke_im_"+e).get("name");$("cke_im_"+e).destroy();$("cke_span_"+e).set("text",c)}if($("cke_im_"+e)==null){var a=this;var d=$("cke_span_"+e).get("text");var b=new Element("input",{styles:{display:"block",height:"14px",border:"1px #000 solid",background:"#fff"},id:"cke_im_"+e,name:$("cke_span_"+e).get("text"),value:$("cke_span_"+e).get("text")});$("cke_span_"+e).set("text","");b.inject($("cke_span_"+e));a.editInput=b;$("cke_im_"+e).focus();b.addEvent("keydown",function(g){if(g.key=="enter"){var f=$("cke_span_"+e);var h=a.getDir(f);h=h.replace("//","/");h=h+d+"/";a.setTree({type:"edit",param:h,name:b.get("value"),id:e},g.target.getParent(),d,b);a.editInput=null}});b.addEvent("blur",function(g){var f=$("cke_span_"+e);var h=a.getDir(f);h=h.replace("//","/");h=h+d+"/";a.setTree({type:"edit",param:h,name:b.get("value"),id:e},b.getParent(),d,b);a.editInput=null})}},createDirTree:function(c,j,e){var a=this;var d=new Element("a",{id:"cke_dir_box_"+a.counter,href:"#",styles:{display:"block","float":"left",height:"9px",width:"9px","margin-top":"8px","margin-left":"-33px"}});var f=new Element("a",{id:"cke_dir_link_"+a.counter,href:"#","class":"cke_dir",styles:{display:"block"}});var h=new Element("span",{id:"cke_span_"+a.counter,text:j.name,"class":"cke_dir span",styles:{display:"block"}});var i=new Element("div",{text:"del","class":"del",styles:{display:"block","float":"right"}});var b=new Element("div",{id:"cke_div_content_"+a.counter,"class":"content cke_dir",styles:{display:"block"}});var g=new Element("div",{id:"cke_edit_button_"+a.counter,text:"edit","class":"edit cke_dir",styles:{display:"block","float":"right"}});if(e!=$("documents_ajax_tree")){i.inject(b);g.inject(b)}var k=new Element("div",{id:"cke_dir_div_"+a.counter});a.counter++;d.inject(f);f.inject(e);b.inject(f);h.inject(b);k.inject(e);$each(j.items,function(l){a.createDirTree(c+"/"+j.name,l,k)});this.tryParent(k);d.addEvent("click",function(l){if(a.editInput!=null){a.editInput.fireEvent("blur")}l.stop();var m=l.target.get("id");m=m.split("_");m=m[3];if(d.hasClass("open")){d.removeClass("open");$("cke_dir_div_"+m).setStyle("display","none")}else{d.addClass("open");$("cke_dir_div_"+m).setStyle("display","block")}});f.addEvent("click",function(l){l.stop()});f.addEvent("mousedown",function(o){o.stop();if(o.target.hasClass("del")){var p=o.target.getParent().get("id");p=p.split("_");p=p[3];var m=null;if($("cke_dir_div_"+p).getChildren().length==0){m=confirm(a.options.language.confirm)}else{m=confirm(a.options.language.confirmTree)}if(m){var n=$("cke_span_"+p);a.setTree({type:"del",param:a.getDir(n),id:p});a.selectcounter=1}}if(o.target.hasClass("edit")){var p=o.target.getParent().get("id");p=p.split("_");p=p[3];a.editElement(p)}if(o.target.hasClass("cke_dir")&&!o.target.hasClass("edit")){var p=o.target.get("id");p=p.split("_");if(o.target.hasClass("span")){p=p[2]}else{p=p[3]}var l=$("cke_dir_link_"+p);if(a.editInput!=null&&a.editInput.getParent().getParent().getParent()!=l){a.editInput.fireEvent("blur")}a.selectElement(l,p)}});f.addEvent("mouseenter",function(l){if(l.target.hasClass("cke_dir")){var m=l.target.get("id");m=m.split("_");if(l.target.hasClass("span")){m=m[2]}else{m=m[3]}if(a.mouseEnterElement!=null){a.mouseEnterElement.removeClass("mouse")}$("cke_dir_link_"+m).addClass("mouse");a.mouseEnterElement=$("cke_dir_link_"+m)}});f.addEvent("mouseleave",function(l){if(l.target.hasClass("cke_dir")){var m=l.target.get("id");m=m.split("_");if(l.target.hasClass("span")){m=m[2]}else{m=m[3]}$("cke_dir_link_"+m).removeClass("mouse");a.mouseEnterElement=null}});return a.counter-1},selectElement:function(d,g){var a=this;var b=d.href;var c=$("cke_span_"+g);if(a.selectItem!=null){a.selectItem.getParent().getParent().removeClass("select")}c.getParent().getParent().addClass("select");a.selectItem=c;var e=$("cke_span_"+g);var f=a.getDir(e);$("cke_url_box").getChildren("span")[0].set("text","/"+f);$("cke_dir_name").set("text",$("cke_span_"+g).get("text"));a.loadImg(f,g);a.selectcounter=g;$("cke_add_directory").removeEvents("click");$("cke_add_directory").addEvent("click",function(h){a.setTree({type:"add",param:f,id:g})})},setTree:function(e,d,f,c){var a=this;if(a.selectcounter==0&&e.type=="add"){return}$("cke_ajax_loader").setStyle("display","block");var b=new Request.JSON({method:"post",url:this.options.config.all_action+"?action=dir_list",data:e,onSuccess:function(g){if(typeof(e)=="undefined"){$("documents_ajax_tree").empty();d=$("documents_ajax_tree");a.createDirTree("http:/",g[0],d);a.loadImg("",1);$("cke_dir_link_1").addClass("select");a.selectItem=$("cke_span_"+1);a.selectcounter="1";$("cke_add_directory").removeEvents("click");$("cke_dir_name").set("text",$("cke_span_"+1).get("text"));$("cke_add_directory").addEvent("click",function(l){a.setTree({type:"add",param:"/",id:"1"})})}else{if(g==null){$("cke_ajax_loader").setStyle("display","none");return}else{if(e.type=="add"&&g.create!="false"){var h=a.createDirTree("http://"+e.param,{name:g.create,items:[]},$("cke_dir_div_"+e.id));a.tryParent($("cke_dir_div_"+e.id));a.editElement(h)}else{if(e.type=="del"&&g.create=="true"){var k=$("cke_dir_div_"+e.id).getParent().get("id");k=k.split("_");k=k[3];if($("cke_dir_div_"+e.id)){$("cke_dir_div_"+e.id).empty();$("cke_dir_div_"+e.id).destroy()}if($("cke_dir_link_"+e.id)){$("cke_dir_link_"+e.id).empty();$("cke_dir_link_"+e.id).destroy()}a.tryParent($("cke_dir_div_"+k));var j=false;$each($$(".cke_dir"),function(l){if(l.getParent().hasClass("select")){j=true}});if(!j){$("cke_dir_link_1").addClass("select");a.selectItem=$("cke_span_"+1);a.selectcounter="1";$("cke_add_directory").removeEvents("click");$("cke_add_directory").addEvent("click",function(l){a.setTree({type:"add",param:"/",id:"1"})});a.loadImg("",1)}}}if(e.type=="edit"){if(g.create=="true"){d.set("text",c.get("value"))}else{d.set("text",f)}c.destroy();var i=a.getDir($("cke_span_"+e.id));$("cke_url_box").getChildren("span")[0].set("text","/"+i);a.selectcounter=e.id;$each($$(".cke_dir"),function(l){if(l.getParent().getParent().hasClass("select")){l.getParent().getParent().removeClass("select")}});a.loadImg(i,e.id);$("cke_dir_link_"+e.id).addClass("select");a.selectItem=$("cke_span_"+e.id);$("cke_add_directory").removeEvents("click");$("cke_add_directory").addEvent("click",function(l){a.setTree({type:"add",param:i,id:e.id})});$("cke_dir_name").set("text",$("cke_span_"+e.id).get("text"))}if(g.create=="false"){alert(a.options.language.serverError)}}}$("cke_ajax_loader").setStyle("display","none")}}).send()},imgScale:function(b){if(b.x>115||b.y>85){var a=100*115/b.x;var d=100*85/b.y;var c=null;if(a<d){c=a}else{c=d}b.x=parseInt(b.x*c/100);b.y=parseInt(b.y*c/100)}},addImg:function(g,c,b){var e=new Element("a",{href:b.options.config.all_action+"?action=list_action","class":"image_cke",styles:{border:"1px #dddddd solid",height:"95px",width:"125px",display:"block"}});var d=new Element("a",{"class":"del",text:"DEL",href:b.options.config.all_action+"?action=del"});var k=new Element("a",{"class":"edit",text:"Edit",href:"/url////"+g.src});var j=new Element("span",{text:g.file,"class":"cke_desc"});b.imgScale(g);var a=b.options.config.server_main_dir+"/"+g.src;var i=a.substring(a.length-5,a.length).split(".");if(typeof(i[1])!="undefined"&&i[1].toLowerCase()=="gif"||i[1].toLowerCase()=="png"||i[1].toLowerCase()=="jpeg"||i[1].toLowerCase()=="jpg"){a="/.temp_pic/.thumbnail/"+g.src}a=a.split("//");a=a.join("/");a=b.options.config.server_temp_dir+a;var f=new Element("img",{title:g.file,alt:g.file,src:a,styles:{height:g.y,width:g.x,"padding-left":(115-g.x)/2+5,"padding-right":(115-g.x)/2+5,"padding-top":(85-g.y)/2+5,"padding-bottom":(85-g.y)/2+5}});var h=new Element("div",{styles:{height:"115px",width:"127px","margin-left":"10px","margin-top":"10px","float":"left"}});f.inject(e);k.inject(h,"top");d.inject(h,"top");j.inject(h,"top");e.inject(h,"top");h.inject($("img_ck_panel_"+c),"top");h.addEvent("mouseenter",function(l){d.setStyle("visibility","visible");k.setStyle("visibility","visible")});h.addEvent("mouseleave",function(l){d.setStyle("visibility","hidden");k.setStyle("visibility","hidden")});k.addEvent("click",function(n){n.stop();var m=n.target.getParent().getChildren("span")[0];var o=m.get("text");var l=new Element("input",{styles:{display:"block",height:"16px","float":"left",width:"92px",border:"1px #000 solid",background:"#fff"},value:m.get("text")});m.setStyle("display","none");l.inject(m,"after");b.editInputImg=l;l.focus();l.addEvent("keydown",function(p){if(p.key=="enter"){b.editFile(l,m,k,o)}});l.addEvent("blur",function(p){b.editFile(l,m,k,o)})});d.addEvent("click",function(n){n.stop();var m=confirm(b.options.language.confirm);if(m){$("cke_ajax_loader").setStyle("display","block");var l=new Request.JSON({method:"post",noCache:true,url:n.target,data:{url:g.src},onSuccess:function(q){if(q.create=="true"){var o=n.target.getParent();o.empty();o.destroy()}else{alert(b.options.language.serverError)}$("cke_ajax_loader").setStyle("display","none")}}).send()}})},editFile:function(c,e,g,f){var a=this;$("cke_ajax_loader").setStyle("display","block");idPanel=e.getParent().getParent().get("id");idPanel=idPanel.split("_");idPanel=idPanel[3];var d=null;if(idPanel==0){d=g.href}else{d="////"+a.getDir($("cke_span_"+idPanel))+f}var b=null;if(a.editFileChange==null){b=new Request.JSON({method:"post",noCache:true,url:a.options.config.all_action+"/?action=edit",data:{url:d,name:c.get("value")},onSuccess:function(i){if(i.create=="false"){alert(a.options.language.serverErrorFile)}else{e.set("text",c.get("value"));if(idPanel==0){g.href="/url////"+i.create;el=e.getParent().getChildren(".image_cke")[0].removeEvents();el.addEvent("click",function(k){k.stop();if(tempThis.ckeditor.config.image_upload_end){$(tempThis.ckeditor.config.image_upload_end).value=tempThis.options.config.server_main_dir+"/"+dir+this.getElement("img").get("alt")}else{a.ckeditor.insertHtml('<img alt="" src="'+a.options.config.server_main_dir+"/"+i.create+'" />')}if(tempThis.ckeditor.config.image_upload_end_function){$(tempThis.ckeditor.config.image_upload_end).fireEvent("change");tempThis.ckeditor.config.image_upload_end=null}a.dialogDefinition.dialog.hide()})}else{img=e.getParent().getChildren(".image_cke")[0].getChildren("img")[0];img.title=i.file;img.alt=i.file;var j=a.options.config.server_main_dir+"/"+i.create;var h=j.substring(j.length-5,j.length).split(".");if(typeof(h[1])!="undefined"&&h[1].toLowerCase()=="gif"||h[1].toLowerCase()=="png"||h[1].toLowerCase()=="jpeg"||h[1].toLowerCase()=="jpg"){j="/.temp_pic/.thumbnail/"+i.create}j=j.split("//");j=j.join("/");j=a.options.config.server_temp_dir+j;img.src=j}link_del=e.getParent().getChildren(".del")[0];link_del.removeEvents("click");link_del.addEvent("click",function(m){m.stop();var l=confirm(a.options.language.confirm);if(l){$("cke_ajax_loader").setStyle("display","block");var k=new Request.JSON({method:"post",noCache:true,url:m.target,data:{url:i.create},onSuccess:function(o){if(o.create=="true"){var n=m.target.getParent();n.empty();n.destroy()}else{alert(a.options.language.serverError)}$("cke_ajax_loader").setStyle("display","none")}}).send()}})}c.destroy();e.setStyle("display","block");$("cke_ajax_loader").setStyle("display","none");a.editFileChange=null}}).send()}a.editFileChange=b;a.editInputImg=null},setLink:function(){var a=this;$each($("documents_ajax").getElements(".image_cke"),function(c,b){var d=c.getParent().getParent().get("id");d=d.split("_");d=d[3];c.removeEvents("click");c.addEvent("click",function(g){var h=this.getElement("img").get("src");id=c.getParent().getParent().get("id");id=id.split("_");id=id[3];g.stop();if(d!=0){var f=a.getDir($("cke_span_"+id));if(a.ckeditor.config.image_upload_end){$(a.ckeditor.config.image_upload_end).value=a.options.config.server_main_dir+"/"+f+this.getElement("img").get("alt")}else{a.ckeditor.insertHtml('<img alt="" src="'+a.options.config.server_main_dir+"/"+f+this.getElement("img").get("alt")+'" />')}if(a.ckeditor.config.image_upload_end_function){$(a.ckeditor.config.image_upload_end).fireEvent("change");a.ckeditor.config.image_upload_end=null}}else{h=h.split("thumbnail");h=h[1];h=h.split("//");h=h.join("/");h=a.options.config.server_main_dir+h;if(a.ckeditor.config.image_upload_end){$(a.ckeditor.config.image_upload_end).value=h}else{a.ckeditor.insertHtml('<img alt="" src="'+h+'" />')}if(a.ckeditor.config.image_upload_end_function){$(a.ckeditor.config.image_upload_end).fireEvent("change");a.ckeditor.config.image_upload_end=null}}a.dialogDefinition.dialog.hide()})})},addInput:function(){var a=this;var b=new Element("input",{accept:a.mimeType(),id:"cke_input_upload_"+a.inputCount,styles:{display:"block"},type:"file",name:"Filedata"+a.inputCount});b.inject($("cke_send_file_submit").getParent(),"before");b.getParent().set("action",a.options.config.all_action+"/?action=update&multidata="+a.inputCount);a.inputCount++;b.addEvent("change",function(g){var d=b.getParent().getChildren("input");if($("cke_doubled_file")==null){var c=new Element("span",{id:"cke_doubled_file",text:a.options.language.file_doubled,styles:{display:"none"}});c.inject($("cke_send_file_submit").getParent(),"after")}var f=false;$each(d,function(e){if(e.value===b.value&&e!==b){f=true}});if(f){$("cke_send_file_submit").removeEvents();$("cke_send_file_submit").addEvent("click",function(h){h.stop();alert(a.options.language.file_doubled)});$("cke_doubled_file").setStyle("display","block")}else{$("cke_send_file_submit").removeEvents();$("cke_send_file_submit").addEvent("click",function(h){idForm=b.getParent().get("id");idForm=idForm.split("_");idForm=idForm[4];$("cke_upload_form_file_"+idForm).getParent().setStyle("display","none");a.addNewUploadForm(a.uploadCounter++)});$("cke_doubled_file").setStyle("display","none")}id=b.get("id");id=id.split("_");id=id[3];if(b.get("value")!=null&&++id==a.inputCount){a.addInput()}})},mimeType:function(){var c=this.options.config.typeFilter.split(";");var b=new Array();b.extend([["image/gif",0],["image/jpeg",0],["image/png",0],["image/bmp",0],["image/tiff",0]]);$each(c,function(e){var d=e.split(".");if(d[1]!=null&&d[1].length>0){if(d[1].toLowerCase()=="jpg"){b[1][1]=1}if(d[1].toLowerCase()=="jpeg"){b[1][1]=1}if(d[1].toLowerCase()=="bmp"){b[3][1]=1}if(d[1].toLowerCase()=="png"){b[2][1]=1}if(d[1].toLowerCase()=="gif"){b[0][1]=1}if(d[1].toLowerCase()=="tiff"){b[4][1]=1}}});var a="";$each(b,function(d){if(d[1]){if(a.length>0){a+=","}a+=d[0]}});return a},addNewUploadForm:function(d){var b=this;b.inputCount=1;var a=new Element("li",{styles:{}});a.innerHTML='<form id="cke_upload_form_file_'+d+'" action="'+this.options.config.all_action+'/?action=update&multidata=" method="post" enctype="multipart/form-data"><div id="cke_send_div_submit"><input id="cke_send_file_submit" type="submit" name="submit" value="'+b.options.language.send_files+'" /></div></form>';a.inject($("files_list"),"top");var c=$("files_list").getChildren("li");$each(c,function(e){if(e.getChildren().length==0){e.destroy()}});this.addInput();if($("cke_ajax_upload_iframe_"+d)==null){iframe=new IFrame({id:"cke_ajax_upload_iframe_"+d,name:"cke_ajax_upload_iframe_"+d,styles:{display:"none"},src:"about:blank",events:{load:function(f){var g=document.getElementById("cke_ajax_upload_iframe_"+d).contentWindow.document;if(g.body.innerHTML!=null){var e=JSON.decode(g.body.innerHTML)}else{e=null}if(e!=null){$each(e,function(j){if(j.name!=null){var i=$("cke_span_"+b.selectcounter);var k=b.getDir(i);$("cke_ajax_loader").setStyle("display","block");var h=new Request.JSON({method:"post",noCache:true,data:{url:k},url:b.options.config.all_action+"/?action=add&file="+j.name,onSuccess:function(m){$("cke_ajax_loader").setStyle("display","none");if(j.code==1&&m.error==null){b.addImg(m,b.selectcounter,b);b.setLink();var l=new Element("li",{text:j.name+" "+b.options.language.file_added});l.inject($("files_list"))}else{var l=new Element("li",{text:j.name+" "+b.options.language.file_error})}if($("cke_upload_form_file_"+d)!=null){$("cke_upload_form_file_"+d).getParent().destroy()}l.inject($("files_list"));$("cke_ajax_loader").setStyle("display","none")}}).send()}})}}}}).inject($(document.body),"top")}$("cke_upload_form_file_"+d).set("target","cke_ajax_upload_iframe_"+d)},loadAjaxUploader:function(){var a=this;this.addNewUploadForm(a.uploadCounter++);$("files_attach").addEvent("click",function(b){b.stop();$("cke_load_panel").setStyle("display","block")})},loadImg:function(e,b,g){var i=this;if(b!=0){i.selectItem=$("cke_span_"+b);i.selectcounter=b}if($("img_ck_panel_"+b)==null||g||b==0){var d=i.getDir($("cke_span_"+i.selectcounter));if(b==0&&e=="/////"){b=i.selectcounter;i.selectItem=$("cke_span_"+b);e=d}else{if(b==0){e=d+"#_!_#"+e}}if($("img_ck_panel_"+b)!=null){$("img_ck_panel_"+b).destroy()}$("cke_ajax_loader").setStyle("display","block");if(i.loadImage!=null){i.loadImage.cancel()}var c=0;var h=new Request.JSON({method:"post",noCache:true,urlEncode:true,data:{param:e},url:this.options.config.all_action+"?action=list_action",onSuccess:function(j){var m=new Element("div",{id:"img_ck_panel_"+b,"class":"cke_main_panel",styles:{overflow:"auto",display:"block",width:"100%",height:"100%"}});$each($$(".cke_main_panel"),function(n){n.setStyle("display","none")});m.inject($("documents_ajax"));$each(j,function(n){$each(n,function(p,o){i.addImg(p,b,i);c++})});i.setLink();$("cke_ajax_loader").setStyle("display","none");i.loadImage=null;var l=$("cke_span_"+i.selectcounter);var k="/"+i.getDir(l);uploader($(m),$(m),CKEDITOR.basePath+"plugins/image_uploader/json_action.php?action=addhtml5&url="+k,true);if(b!=0){$("cke_search_input").value="";$("cke_reset_button").setStyle("visibility","hidden")}}}).send();i.loadImage=h}else{$each($$(".cke_main_panel"),function(j){j.setStyle("display","none")});$("img_ck_panel_"+b).setStyle("display","block");var a="/"+i.getDir($("cke_span_"+i.selectcounter));if(b!=0){$("cke_search_input").value="";$("cke_reset_button").setStyle("visibility","hidden")}}var f=$("cke_span_"+b)},setUploadPanel:function(){$("close_upload_file").addEvent("click",function(a){a.stop();$("cke_load_panel").setStyle("display","none")})},setRefresh:function(){var a=this;$("cke_refresh").addEvent("click",function(c){if(c){c.stop()}var b=$("cke_span_"+a.selectcounter);if(a.selectcounter!=0){var d=a.getDir(b);a.loadImg(d,a.selectcounter,true)}else{a.loadImg(a.search,a.selectcounter,true)}})},setSearch:function(){var a=this;$("cke_search_button").addEvent("click",function(b){b.stop();a.loadImg("/////"+$("cke_search_input").get("value"),0,false);a.search="/////"+$("cke_search_input").get("value")});$("cke_search_input").addEvent("keyup",function(b){b.stop();a.loadImg("/////"+$("cke_search_input").get("value"),0,false);a.search="/////"+$("cke_search_input").get("value");if($("cke_search_input").get("value")!=""){$("cke_reset_button").setStyle("visibility","visible")}else{$("cke_reset_button").setStyle("visibility","hidden")}});$("cke_search_button").addEvent("change",function(b){if($("cke_search_input").get("value")!=""){$("cke_reset_button").setStyle("visibility","visible")}else{$("cke_reset_button").setStyle("visibility","hidden")}});$("cke_reset_button").addEvent("click",function(b){$("cke_reset_button").setStyle("visibility","hidden");a.loadImg("/////",0,false)})},loadFancy:function(){var b=this;var a=new FancyUpload3.Attach("files_list","#files_attach, #files_attach_another",{path:b.options.config.uploader_swf,allowDuplicates:true,url:b.options.config.all_action+"/?action=update&"+session_uri,fileSizeMax:b.options.config.file_size_max*1024*1024,verbose:b.options.config.verbose,appendCookieData:b.options.config.appendCookieData,fileListMax:b.options.config.fileListMax,typeFilter:b.options.config.typeFilter,onSelectSuccess:function(c){},onSelectFail:function(c){c.each(function(d){new Element("li",{"class":"file-invalid",events:{click:function(){this.destroy()}}}).adopt(new Element("span",{html:d.validationErrorMessage||d.validationError})).inject(this.list,"bottom")},this)},onFileSuccess:function(d){d.ui.element.highlight("#e6efc2");var e=$("cke_span_"+b.selectcounter);var f=b.getDir(e);$("cke_ajax_loader").setStyle("display","block");var c=new Request.JSON({method:"post",noCache:true,data:{url:f},url:b.options.config.all_action+"/?action=add&file="+d.response.name,onSuccess:function(h){if(h.error==null){b.addImg(h,b.selectcounter,b);b.setLink();d.ui.element.destroy()}else{var g=new Element("span",{text:b.options.language.file_error});g.inject(d.ui.element)}if($("files_list").getChildren().length==0){}$("cke_ajax_loader").setStyle("display","none")}}).send()},onFileError:function(d,f,c){d.ui.cancel.set("html",b.options.language.renew).removeEvents().addEvent("click",function(){d.requeue();return false});new Element("span",{html:d.errorMessage,"class":"file-error"}).inject(d.ui.cancel,"after")},onFileRequeue:function(c){c.ui.element.getElement(".file-error").destroy();c.ui.cancel.set("html",b.options.language.del).removeEvents().addEvent("click",function(){c.remove();return false});this.start()}});this.fancy=a}});