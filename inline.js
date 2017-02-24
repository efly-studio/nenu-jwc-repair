document.selection = window.getSelection()
Object.defineProperties(window, {
  'send_request': {
    writable: false,
    value: function(url, SystemBh) {
      http_request = false;
      if (window.XMLHttpRequest) {
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
          http_request.overrideMimeType("text/xml");
        }
      } else if (window.ActiveXObject) {
        try {
          http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
          try {
            http_request = new ActiveXObject("Microsoft.XMLHTTP");
          } catch (ei) {}
        }
      }
      if (!http_request) {
        window.alert("不能创建对象!");
        return false;
      }

      try {
        http_request.open("POST", url, false);
        http_request.setRequestHeader("CONTENT-TYPE", "application/x-www-form-urlencoded");
        http_request.send(null);

        var tmpxml = http_request.responseXML;
        //加载顶层菜单开始
        var topXml = tmpxml.getElementsByTagName("topMenus")[0].getElementsByTagName("Menu");
        for (i = 0; i < topXml.length; i++) {
          topMenuItems[topMenuLength] = new Array();
          topMenuItems[topMenuLength][0] = topXml[i].attributes.getNamedItem("parentid").value;
          topMenuItems[topMenuLength][1] = SystemBh + "_" + topXml[i].attributes.getNamedItem("id").value;
          topMenuItems[topMenuLength][2] = topXml[i].attributes.getNamedItem("name").value;
          topMenuItems[topMenuLength][3] = topXml[i].attributes.getNamedItem("title").value;
          topMenuItems[topMenuLength][4] = topXml[i].attributes.getNamedItem("path").value;
          topMenuItems[topMenuLength][5] = topXml[i].attributes.getNamedItem("imageUrl").value;
          topMenuItems[topMenuLength][6] = topXml[i].attributes.getNamedItem("defaultPage").value;
          topMenuLength++;
        }
        //加载顶层菜单结束

        //加载一层菜单开始
        var menuXml = tmpxml.getElementsByTagName("Level1Menus")[0].getElementsByTagName("Menu");
        for (i = 0; i < menuXml.length; i++) {
          menuItems[menuLength] = new Array();
          menuItems[menuLength][0] = SystemBh + "_" + menuXml[i].attributes.getNamedItem("parentid").value;
          menuItems[menuLength][1] = SystemBh + "_" + menuXml[i].attributes.getNamedItem("id").value;
          menuItems[menuLength][2] = '&nbsp;' + menuXml[i].attributes.getNamedItem("name").value;
          menuItems[menuLength][3] = menuXml[i].attributes.getNamedItem("title").value;
          menuItems[menuLength][4] = menuXml[i].attributes.getNamedItem("path").value;
          menuItems[menuLength][5] = menuXml[i].attributes.getNamedItem("imageUrl").value;
          menuLength++;
        }
        //加载一层菜单结束

        //加载二层菜单开始
        var linkXml = tmpxml.getElementsByTagName("Level2Menus")[0].getElementsByTagName("Menu");
        for (i = 0; i < linkXml.length; i++) {
          linkItems[linkLength] = new Array();
          linkItems[linkLength][0] = SystemBh + "_" + linkXml[i].attributes.getNamedItem("parentid").value;
          linkItems[linkLength][1] = SystemBh + "_" + linkXml[i].attributes.getNamedItem("id").value;
          linkItems[linkLength][2] = '&nbsp;&nbsp;' + linkXml[i].attributes.getNamedItem("name").value;
          linkItems[linkLength][3] = linkXml[i].attributes.getNamedItem("title").value;
          linkItems[linkLength][4] = linkXml[i].attributes.getNamedItem("path").value;
          linkItems[linkLength][5] = linkXml[i].attributes.getNamedItem("imageUrl").value;
          linkLength++;
        }
        //加载二层菜单结束
      } catch (e) {
        alert("加载编号为" + SystemBh + "的应用系统失败，可能是网络延迟问题！");
      }
    }
  }
})
