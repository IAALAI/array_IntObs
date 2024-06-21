/**
 * @param {Array<string | HTMLElement>} arr 允许传入字符串或者DOM节点,如果是字符串则代表是接下来需要被监视的元素
 * @param {Function(IntersectionObserverEntry)} callback 执行你预期的回调
 * @param {Function} endOvs 监视完成所有的内容
 */
export default function arr_obs(arr, callback, endOvs, obsConfig) {
    let i = 0;
    let trackNext = () => {};
    if (arr[0].toString() === arr[0]) {
        trackNext = () => {
            return document.querySelector(arr[i])
        }
    } else {
        trackNext = () => {
            return arr[i]
        }
    }
    let obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (i < arr.length - 1) {
                    callback(entry);
                    obs.unobserve(entry.target);
                    i++;
                    obs.observe(trackNext());
                } else {
                    endOvs();
                    obs.disconnect();
                }
            }
        }, obsConfig);
    });
    obs.observe(trackNext());
    return;
}