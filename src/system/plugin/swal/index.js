import Swal from 'sweetalert2/dist/sweetalert2';
import './styles/swal.scss';

import ALERT from './sounds/alert01.mp3';
import SUCCESS from './sounds/success01.mp3';


export default function() {
    const defaultStyle = {
        background: '#212121',
        confirmButtonText: translate(`common:button.confirm`),
        cancelButtonText: translate(`common:button.cancel`),
        confirmButtonColor: '#007BFF',
        cancelButtonColor: '#DC3446',
    };

    function playAudio(url) {
        if (app.sound.mute()) return;

        return new Audio(url)
            .play()
            .catch((err) => console.log(err));
    }

    function error(msg) {
        const config = {
            ...defaultStyle,

            type: 'error',
            text: translate(`common:error.unspecific`),
            confirmButtonText: translate(`common:button.back`),
            confirmButtonColor: '#DC3446',

            ...(msg),
        };

        return Swal.fire(config)
            .then(() => history.back());
    }

    function reload(msg) {
        const config = {
            ...defaultStyle,

            type: 'error',
            text: translate(`common:error.connection`),
            confirmButtonText: translate(`common:button.refresh`),
            confirmButtonColor: '#DC3446',

            ...(msg),
        };

        return Swal.fire(config)
            .then(() => location.reload());
    }

    function request(data) {
        const config = {
            ...defaultStyle,

            type: 'warning',
            showCancelButton: true,

            ...(data),
        };

        playAudio(ALERT);

        return Swal.fire(config);
    }

    function loading(msg = {}) {
        const config = {
            ...defaultStyle,

            allowEscapeKey: false,
            allowOutsideClick: false,
            onBeforeOpen: () => Swal.showLoading(),

            ...(msg),
        };
        return Swal.fire(config);
    }

    function close() {
        return Swal.close();
    }

    function success({title}) {
        const config = {
            ...defaultStyle,

            type: 'success',
            title,
            showConfirmButton: false,
            timer: 2000,
        };

        playAudio(SUCCESS);

        return Swal.fire(config);
    }

    function leave() {
        const config = {
            ...defaultStyle,

            type: 'warning',
            title: translate(`common:message.exit`),
            confirmButtonText: translate(`common:button.exit`),
            confirmButtonColor: '#DC3446',
            showCancelButton: true,
            cancelButtonColor: '#007BFF',
        };

        return Swal.fire(config)
            .then(({value}) => (value) && history.back());
    }

    function checkoutList({gold, gift, etc, bonus}) {
        const config = {
            ...defaultStyle,

            title: translate(`common:message.checkoutTitle`),
            html: `
        <ul id="list">
        </ul>
        `,
            cancelButtonColor: '#007BFF',
            onBeforeOpen,
        };

        return Swal.fire(config);

        function onBeforeOpen() {
            Swal.showLoading();

            const content = Swal.getContent();

            const list = content.querySelector('#list');

            const host = 'http://dev01.ulg168.com/front/img/icon/usercoin/';

            const tasks = [
                {url: 'user_bg_gold_01', money: gold},
                {url: 'user_bg_ulg_01', money: etc},
                {url: 'user_bg_bonus_01', money: bonus},
                {url: 'user_bg_gift_01', money: gift},
            ].map(({url, money}) => {
                const image = new Image();
                image.src = host + url + '.png';

                const text =
                    document.createElement('div');

                text.textContent = money;

                const container =
                    document.createElement('div');

                container.append(image, text);
                container.classList.add('text-center', 'number-font');

                const item =
                    document.createElement('li');

                item.append(container);

                return new Promise((resolve) => {
                    image.onload = () => resolve(item);
                });
            });

            Promise.all(tasks)
                .then((items) => {
                    items.forEach((item) => {
                        list.appendChild(item);
                    });
                })
                .then(() => Swal.hideLoading());
        }
    }

    return {
        error, leave, loading, close, reload,
        success, checkoutList, request,
    };
}
