import _ from 'loadsh';
import './css/style.css';
import avatar from './images/product.png';
import data from './data/data.xml';
import app from './views/app';
import { cube } from './views/math';

function component() {
    let div = document.createElement('div');
    div.innerHTML = _.join('hello webpack', '');
    div.classList.add('hello');

    let userImg = new Image();
    userImg.src = avatar;
    div.appendChild(userImg);

    console.log(cube(5))

    console.log(data)

    var btn = document.createElement('button');
    btn.innerHTML = '点击这里，然后查看 console！';
    btn.onclick = app;

    div.appendChild(btn);

    return div;
}

document.body.appendChild(component());

// 监听热更新
// if (module.hot) {
//     module.hot.accept('./views/app.js', function() {
//         document.body.removeChild(element);
//         element = component(); // 重新渲染 "component"，以便更新 click 事件处理函数
//         document.body.appendChild(element);
//     })
// }