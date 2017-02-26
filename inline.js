document.selection = window.getSelection();
Object.defineProperties(window, {
  'send_request': {
    writable: false,
    value: function(url, SystemBh) {
      http_request = new XMLHttpRequest();

      try {
        http_request.open("POST", url, false);
        http_request.setRequestHeader("CONTENT-TYPE", "application/x-www-form-urlencoded");
        http_request.send(null);

        var tmpxml = http_request.responseXML;
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
      } catch (e) {
        window.location.reload();
      }
    }
  }
})
