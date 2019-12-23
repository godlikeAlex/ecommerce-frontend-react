export const addItem = (item, cb) => {
    let cart = [];

    if(typeof window !== "undefined") {
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.push({
            ...item,
            count: 1
        });

        cart = Array.from(new Set(cart.map(p => (p._id)))).map(id => {
            return cart.find(p => p._id === id);
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        cb();
    }
};

export const itemTotal = () => {
    if (typeof window !== "undefined") {
        if(localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length;
        }
    }
    return 0;
};