const lines = [

    "Maligayang kaarawan, mahal ko!",
     "I hope you'll forgive the architecture of this site,",
    "When you mentioned that Happy's websites got nuked, the first thing I thought of was: does that mean you lost the globe, too?",
    "I'm still working on getting the whole constellations and friends' homes thing to work",
    "I'm trying to get the homes things to be a user-added thing so you can add as you please,",
    "Pero this isn't about the website.",
    "It's your bornday today, which means that",
    "it's officially been 21 years since the first time this world heard your voice.",
    "I hope you know how special that is.",
    "Precious Faith, I hope you know how special you are.",
    "You're have the kindest, gentlest heart,",
    "Generosity you only hear about in fairytales",
    "Wit and charm about you that leave people laughing 'til their bellies ache, (or make men mald idk)",
    "and thoughtfulness that makes every life you grace so much lighter for it,",
    "You also have the sweetest, most tender soul",
    "True to your namesake, my God, what a gift you are to this world.",
    "Oh teka",
    "Di pa ako tapos.",
    "Ahem.",
    "Furthermore,",
    "You have the cutest freaking eyes and the most breathtaking smile",
    "More than that, you're so poganda I want to bite your cheeks so bad",
    "And also you have a really nice butt <3",
    "Talk about birthday CAKE mmm <3",
    "More than that,",
    "You're the smartest and most multi-talented person I've met",
    "Not to mention the funniest.",
    "And above all that, still, you remain humble, lookign to Papa to guide you",
    "I could go on and on about all the things I love about you,",
    "But I think it's better if I say it like this instead;",
    "Mahal na mahal kita.",
    "Ika'y aking pinakamamahal at sa araw-araw, ang panalangin ko para sa'yo ay",
    "ang iyong kaligayahan, kapayapaan, kalusugan, at kalayaan.",
    "Araw-araw pinagdadasal kita kay Papa na patuloy kang gagabayin at proprotektahin sa bawat aspeto ng iyong buhay.",
    "Sa dinami-rami mong pinagdaanan na pagsubok at pangdurusa, sa kabila ng lahat ng 'yon,",
    "Tinuloy mo ang iyong pagiging mabuting tao. Hindi ka tumigil sa paghahabol sa iyong mga pangarap,",
    "At kahit na alam ng lahat ng tao kung gaano ka kagaling, nanatili ka pa ring masipag, matiyaga, at mapagpakumbaba.",
    "Ang tanging hiling ko sa'yo ay ang iyong kaligayahan,",
    "at kung maaari, nawa'y ako yung pipiliin mo na makasama sa pagbubuo ng isang buhay na mapapagmalaki mo,",
    "na puno ng kasayahan, pagmamahalan, pagaaruga, pagsisilbi kay Papa, at ng katahimikan na magdadala ng pagiging kuntento sa buhay",
    "Ti amo tantissimo, irog ko.",
    "Mahal na mahal kita,",
    "You're the brightest star in my sky, mahal. No matter how deep the night, I would follow you anywhere",
    "Happy happy bornday, my love of loves, light of my life, keeper of my soul",
    "Iyong-iyo, ngayon at kailanman, Andi mo.",

    ];

const target = document.getElementById("target");
const input = document.getElementById("input");
const finalMessage = document.getElementById("finalMessage");


let currentLine = 0;


// show first line
showLine();


function showLine(){

    target.innerHTML = "";

    let text = lines[currentLine];

    text.split("").forEach(letter => {

        let span = document.createElement("span");

        span.textContent = letter;
        span.className = "remaining";

        target.appendChild(span);

    });

}

//i wish i could take credit for this but theres surprisingly a lot of tutorials on how to do this! 

input.addEventListener("input", ()=>{

    let typed = input.value;

    let letters = target.children;


    for(let i = 0; i < letters.length; i++){

        if(i < typed.length){

            if(typed[i] === letters[i].textContent){
                letters[i].className = "correct";
            }
            else {
                letters[i].className = "incorrect";
            }

        }
        else {

            letters[i].className = "remaining";

        }

    }

});



input.addEventListener("keydown",(event)=>{


    if(event.key === "Enter"){

        if(input.value === lines[currentLine]){

            currentLine++;

            input.value = "";


            if(currentLine < lines.length){

                showLine();

            }
            else {

                finish();

            }

        }

    }

});



function finish(){

    document.getElementById("game").style.display="none";

    finalMessage.style.display="block";

    finalMessage.innerHTML =
        lines.join("<br><br>");

}