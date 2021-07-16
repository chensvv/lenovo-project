$(document).ready(function() {
	var obox = document.getElementById("box")
	var obn = document.getElementById("b-m")
	var optxt = document.getElementById("op-txt")
	var odown = document.getElementById("down");
	var defaultLang='chinese';
	function getLang(){
		if (document.cookie.indexOf('grycan.cn.bLang') != -1) {
			var arrCookie = document.cookie.split(';')
			for (let i = 0; i < arrCookie.length; i++) {
				var arr = arrCookie[i].split('=');
				if ('grycan.cn.bLang' == arr[0].trim()) {
					defaultLang = arr[1];
					languageSelect(defaultLang);
					if (defaultLang == 'english') {
						$('#op-img').attr('src','https://voice.lenovomm.com/voicePlatform/welcome/images/usa.png')
					} else if(defaultLang == 'chinese') {
						$('#op-img').attr('src','https://voice.lenovomm.com/voicePlatform/welcome/images/china.png')
					}
					break;
				}
			}
		}
		// console.log(defaultLang)
	}
	getLang();
	/*调用语言包*/
	function languageSelect(defaultLang) {
		$("[i18n]").i18n({
			defaultLang: defaultLang,
			filePath: "https://voice.lenovomm.com/voicePlatform/welcome/js/i18n/",
			filePrefix: "i18n_",
			fileSuffix: "",
			forever: true,
			callback: function(res) {
				
			}
		});
	}
	languageSelect(defaultLang)
	// 设置cookie
	function setLang(name,value,path){
		var Days = 30; 
		var exp = new Date(); 
		exp.setTime(exp.getTime() + Days*24*60*60*1000); 
		var paths = ";path=" + path;
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() +paths;
	}
	// $('.trans-en').change(function(){
	// 	var condition = $(this).val();
	// 	console.log(condition)
	// 	if(condition == 'English'){
	// 		defaultLang = 'english';
	// 		setLang('grycan.cn.bLang','english','/')
	// 	}else if(condition == '简体中文'){
	// 		defaultLang = 'cn';
	// 		setLang('grycan.cn.bLang','chinese','/')
	// 	}
	// 	getLang();
	// 	// document.location.reload(true);
	// })

	
        //当点击obox时，呈现出下拉列表的内容，给个延时效果
        obox.onmouseover = function(){
			odown.style.display = "block";
			// $('#d-img').attr('src','../common/images/do.png')
            //选中列表中的某一项并将其呈现在box中,隐藏下拉列表
            for(var i=0;i<$('#down li').length;i++){
                $('#down li')[i].n = i;
                $('#down li')[i].onclick = function(){
                    obn.innerHTML = this.innerHTML;
					odown.style.display = "none";
					location.reload()
					// $('#d-img').attr('src','../common/images/dow.png')
					var condition = $('#box span').text()
					if(condition == 'English'){
						defaultLang = 'english';
						setLang('grycan.cn.bLang','english','/')
					}else if(condition == '简体中文'){
						defaultLang = 'chinese';
						setLang('grycan.cn.bLang','chinese','/')
					}
					getLang();
                }
            }
        }
        obox.onmouseout = function(){
		  odown.style.display = "none";
		//   $('#d-img').attr('src','../common/images/dow.png')
        }
        odown.onmouseover = function(){
		  odown.style.display = "block";
		//   $('#d-img').attr('src','../common/images/do.png')
        }
        odown.onmouseout = function(){
		  odown.style.display = "none";
		//   $('#d-img').attr('src','../common/images/dow.png')
        }
})

