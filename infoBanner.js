AFRAME.registerComponent("info-banner", {
    schema: {
        itemId: { type: "string", default: ""}
    },
    update: function(){
        this.createBanner();
    },
    createBanner: function(){
        mangaInfo = {
            "assassination-classroom": {
                title: "Assassination Classroom",
                description: "Assassination Classroom is a Japanese science fiction comedy manga series written and illustrated by Yusei Matsui. It is about a group of high school students tasked to assassinate their teacher, Koro-sensei (an unknown destructive lifeform).",
                banner_url: "./assets/assassination-classroom-comic-strip.png"
            },
            "demon-slayer": {
                title: "Demon Slayer",
                description: "Demon Slayer is a Japanese manga series written and illustrated by Koyoharu Gotouge. It's about a teenage boy, Tanjiro, trying to become a demon slayer after he knows about his family's assasination and his sister, Nezuko, turned into a demon.",
                banner_url: "./assets/demon-slayer-comic-strip.png"
            },
            jojo: {
                title: "JoJo's Bizarre Adventure",
                description: "JoJo's Bizarre Adventure is a Japanese manga series written and illustrated by Hirohiko Araki. It all started when Jonathan Joestar (aka JoJo) was involved in a battle with Dio (the main protagonist). This led to more stories involving Dio (in some parts) and the descendants of Jonathan Joestar.",
                banner_url: "./assets/jojo-comic-strip.png"
            },
            "the-promised-neverland": {
                title: "The Promised Neverland",
                description: "The Promised Neverland is a Japanese manga series written by Kaiu Shirai and illustrated by Posuka Demizu. This manga series is about a bunch of orphans (they're all children) who are enjoying a normal life unaware of the orphanage's dark secret. However, this changed when one of the older kids discovered something disturbing about their orphanage...",
                banner_url: "./assets/the-promised-neverland-comic-strip.png"
            },
        };
        
        const { itemId } = this.data;

        const fadeBackgroundEl = document.querySelector("#fadeBackground");

        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("visible", true);
        //entityEl.setAttribute("id", `${itemId}-comic-strip`);
        entityEl.setAttribute("geometry", {
            primitive: "plane",
            width: 0.9,
            height: 1
        });
        entityEl.setAttribute("material", {color: "#000"});
        entityEl.setAttribute("position", { x: 0, y: 1.5, z: -1 });

        const item = mangaInfo[itemId]; //fetching the selected item id

        const imageEl = this.createImage(item);
        const titleEl = this.createTitle(item);
        const descriptionEl = this.createDescription(item);

        entityEl.appendChild(imageEl);
        entityEl.appendChild(titleEl);
        entityEl.appendChild(descriptionEl);

        fadeBackgroundEl.appendChild(entityEl);
    },
    createTitle: function(item){
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("visible", true);
        entityEl.setAttribute("text", {
            shader: "msdf",
            anchor: "left",
            font: "https://cdn.aframe.io/examples/ui/Viga-Regular.json",
            width: 1.2,
            height: 2,
            color: "#fff",
            value: item.title
        });
        entityEl.setAttribute("position", { x: -0.35, y: 0, z: 0.05 });
        return entityEl;
    },  
    createDescription: function(item){
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("visible", true);
        entityEl.setAttribute("text", {
            shader: "msdf",
            anchor: "left",
            font: "https://cdn.aframe.io/examples/ui/Viga-Regular.json",
            width: 0.75,
            height: 2,
            color: "#fff",
            wrapCount: "40",
            value: item.description
        });
        entityEl.setAttribute("position", { x: -0.4, y: -0.24, z: 0.05 });
        return entityEl;
    },
    createImage: function(item){
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("visible", true);
        entityEl.setAttribute("geometry", {
            primitive: "plane",
            width: 0.85,
            height: 0.4
        });
        entityEl.setAttribute("material", { src: item.banner_url });
        entityEl.setAttribute("position", { x: 0, y: 0.3, z: 0.05 });
        return entityEl;
    }
});