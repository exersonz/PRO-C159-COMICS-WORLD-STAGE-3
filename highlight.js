AFRAME.registerComponent("cursor-listener", {
    schema: {
      selectedItemId: { default: "", type: "string" } //we will be assigning a blank variable for keeping track of the poster that we hovered over because the same one will be changed when we do mosueleave on that
    },
    init: function(){
      //calling both events initally
      this.handleMouseEnterEvents();
      this.handleMouseLeaveEvents();
    },
    update: function(){
      const fadeBackgroundEl = document.querySelector("#fadeBackground");
      //check if the info-banner plane already has comic text info child entity
      //if so remove the child to avoid the overlapping of the text
      c = fadeBackgroundEl.children;
      if(c.length > 0){
        var i;
        for(i = 0; i <= c.length; i++){
          fadeBackgroundEl.removeChild(c[i]);
        }
      }

      else{
        this.handleClickEvents();
      }
    },
    handlePosterListState: function(){
      const id = this.el.getAttribute("id"); //getting id of the poster we have hovered over
      const posterId = ["assassination-classroom", "demon-slayer", "jojo", "the-promised-neverland"];
      //comparing if the ids belong to any of them
      if (posterId.includes(id)) {
        const posterContainer = document.querySelector("#posters-container");
        posterContainer.setAttribute("cursor-listener", {
          selectedItemId: id,
        });
        this.el.setAttribute("material", {
          color: "#D76B30",
          opacity: 0.4,
        });
      }
    },
    handleMouseEnterEvents: function(){
      // Mouse Enter Events
      this.el.addEventListener("mouseenter", () => {
        this.handlePosterListState();
      });
    },
    handleMouseLeaveEvents: function(){
      // Mouse Leave Events
      this.el.addEventListener("mouseleave", () => {
        const {selectedItemId} = this.data;
        if(selectedItemId){
          const el = document.querySelector(`#${selectedItemId}`);
          const id = el.getAttribute("id");
          if(id == selectedItemId){
            el.setAttribute("material", {
              color: "#fff",
              opacity: 0.4
            });
          }
        }
      });
    },
    handleClickEvents: function(){
      this.el.addEventListener("click", () => {
        const fadeBackgroundEl = document.querySelector("#fadeBackground");
        const titleEl = document.querySelector("#app-title");
        const subtitleEl = document.querySelector("#app-subtitle");
        const cursorEl = document.querySelector("#camera-cursor");
        const { selectedItemId } = this.data;
        //check the selected item to set the "info-banner" component on the plane
        if(selectedItemId){
          fadeBackgroundEl.setAttribute("visible", true);
          //updating the itemId variable into the selectedItemId so we can show the correct banner image when clicking on the image
          fadeBackgroundEl.setAttribute("info-banner", {
            itemId: selectedItemId
          });
          titleEl.setAttribute("visible", false);
          subtitleEl.setAttribute("visible", false);
          cursorEl.setAttribute("position", { x: 0, y: 0, z: -1});
          cursorEl.setAttribute("geometry", {
            radiusInner: 0.03,
            radiusOuter: 0.04
          });
        }

        else{
          //make the plane invisible if the above condition doesn't work
          fadeBackgroundEl.setAttribute("visible", false);
          titleEl.setAttribute("visible", true);
          subtitleEl.setAttribute("visible", true);
          cursorEl.setAttribute("position", { x: 0, y: 0, z: -3});
          cursorEl.setAttribute("geometry", {
            radiusInner: 0.08,
            radiusOuter: 0.12
          });
        }
      });
    }
  });  