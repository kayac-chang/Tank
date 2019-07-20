export function Alien(view) {
    view.showMagnet = showMagnet;
    view.hideMagnet = hideMagnet;

    view.happy = happy;
    view.sad = sad;
    view.shy = shy;

    return view;

    function happy() {
        view.transition[0].restart();
    }

    function sad() {
        view.transition[2].restart();
    }

    function shy() {
        view.transition[3].restart();
    }

    function showMagnet() {
        const anim = view.transition['ShowMagnet'];

        anim.restart();

        return anim.finished;
    }

    function hideMagnet() {
        const anim = view.transition['HideMagnet'];

        anim.restart();

        return anim.finished;
    }
}
