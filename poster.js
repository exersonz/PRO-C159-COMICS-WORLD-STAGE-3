AFRAME.registerComponent("manga", {
    init: function() {
        this.postersContainer = this.el;
        this.createCards();
    },
    createCards: function(){
        const posterRef = [
            {
                id: "assassination-classroom",
                title: "Assassination Classroom",
                url: "./assets/assassination_classroom.png"
            },
            {
                id: "demon-slayer",
                title: "Demon Slayer",
                url: "./assets/demon_slayer.png"
            },
            {
                id: "jojo",
                title: "JoJo's Bizarre Adventure",
                url: "./assets/jojo.png"
            },
            {
                id: "the-promised-neverland",
                title: "The Promised Neverland",
                url: "./assets/the_promised_neverland.png"
            }
        ];
        let previousXPosition = -60;

        for(var item of posterRef){
            const posX = previousXPosition + 25;
            const posY = 10;
            const posZ = -40;
            const position = {x: posX, y: posY, z: posZ};
            previousXPosition = posX;

            //border element
            const borderEl = this.createBorder(position, item.id)

            //poster element
            const poster = this.createPosters(item);
            borderEl.appendChild(poster);

            //title text element
            const titleEl = this.createTitleEl(position, item);
            borderEl.appendChild(titleEl);

            this.postersContainer.appendChild(borderEl);
        }
    },
    createBorder: function(position, id){
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("id", id);
        entityEl.setAttribute("visible", true);
        entityEl.setAttribute("geometry", {
            primitive: "plane",
            width: 21,
            height: 29
        });
        entityEl.setAttribute("position", position);
        entityEl.setAttribute("material", {
            color: "#fff",
            opacity: 0.4
        });
        entityEl.setAttribute("cursor-listener", {});
        return entityEl; //if this isn't used the output will not show!!
    },
    createPosters: function(item){
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("visible", true);
        entityEl.setAttribute("geometry", {
            primitive: "plane",
            width: 20,
            height: 28
        });
        entityEl.setAttribute("material", {src: item.url});
         
        return entityEl; 
    },
    createTitleEl: function(position, item){
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("text", {
            font: "exo2bold",
            align: "center",
            width: 60,
            color: "#475e80",
            value: item.title
        });
        const elPosition = position;
        elPosition.y = -25;
        entityEl.setAttribute("position", elPosition);
        return entityEl;
    }
});