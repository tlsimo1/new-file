// variables
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");
let cart = [];
let buttonsDOM = [];


class products{
  async  getProduct()
    {
        try {
            let result= await fetch("products.json");
            let data= await result.json();
            let products=data.items;
            products= products.map(item=>{
                const {title,price}=item.fields;
                const {id}=item.sys;
                const image=item.fields.image.fields.file.url;
                return {title,price,id,image};
            })
            return products
        } catch (error) {
            console.log(error);
        }

    }
}
//display product
class UI{

    displayProduct(product)
    {
        let result="";
        product.forEach(prod => {
            result+=`
            <article class="product">
            <div class="img-container">
              <img src=${prod.image} style="height:150px">
              <button class="bag-btn" data-id=${prod.id}>
                <i class="fas fa-shopping-cart"></i>
                add to bag
              </button>
            </div>
            <h3>${prod.title}</h3>
            <h4>$${prod.price}</h4>
          </article>`
        });
        productsDOM.innerHTML=result;
    }
    getBugButtons()
    {
        const buttons=[...document.querySelectorAll(".bag-btn")];
        buttons.forEach(button=>{
            
            let id=button.dataset.id;
            let inCart=cart.find(item=>item.id===id);
            if(inCart)
            {
                button.innerText="In Cart";
                button.disabled=true;
            }
          
             button.addEventListener("click",event=>
                {
                  
                    event.target.innerText="In Cart";
                    event.target.disabled=true;
                    let cartItem={...Storage.getProduct(id),amount:1};
                    cart=[... cart,cartItem];
                    Storage.saveCart(cart);

                    this.setCartValue(cart);
                    this.addCartItem(cartItem);
                    this.showCart();
                    console.log(cartItem);
                })   
            
        })
    }
    setCartValue(cart)
    {
        let tempTotal=0;
        let itemsTotal=0;
        cart.map(item=>{
            tempTotal+=item.price*item.amount;
            itemsTotal+=item.amount;
        });
        cartTotal.innerText=parseFloat(tempTotal.toFixed(2));
        cartItems.innerText=itemsTotal;
    }
    addCartItem(item)
    {
        const div=document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML=`<img src=${item.image} alt="product" />
        <!-- item info -->
        <div>
          <h4>${item.title}</h4>
          <h5>$${item.price}</h5>
          <span class="remove-item" data-id=${item.id}>remove</span>
        </div>
        <!-- item functionality -->
        <div>
            <i class="fas fa-chevron-up" data-id=${item.id}></i>
          <p class="item-amount">
            ${item.amount}
          </p>
            <i class="fas fa-chevron-down" data-id=${item.id}></i>
        </div>`
        cartContent.appendChild(div);
        console.log(cartContent);
    }
    showCart() {
        cartOverlay.classList.add("transparentBcg");
        cartDOM.classList.add("showCart");
      }
      setupAPP()
      {
          cart=Storage.getCart();
          this.setCartValue(cart);
          this.populateCart(cart);
          cartBtn.addEventListener('click',this.showCart);
          closeCartBtn.addEventListener('click',this.hideCart);
      }
      populateCart(cart)
      {
        cart.forEach(item=>this.addCartItem(item))
      }
      showCart() {
        cartOverlay.classList.add("transparentBcg");
        cartDOM.classList.add("showCart");
      }
      hideCart() {
        cartOverlay.classList.remove("transparentBcg");
        cartDOM.classList.remove("showCart");
      }
      cartLogic()
      {
          clearCartBtn.addEventListener('click',()=>
          {
              this.clearCart();
          })
      }
      clearCart()
      {
          let cartItems=cart.map(item=>item.id);
          console.log(cartItems);
      }
}
//local storage
class Storage{

    static saveProduct(product)
    {
        localStorage.setItem("products",JSON.stringify(product))
    }
    static getProduct(id)
    {
        let products=JSON.parse(localStorage.getItem("products"))
        return products.find(prod=>prod.id===id);
    }
    static saveCart(cart)
    {
        localStorage.setItem('Cart',JSON.stringify(cart));
    }
    static getCart()
    {
        return localStorage.getItem('Cart')?JSON.parse(localStorage.getItem('Cart')):[];
    }
}

document.addEventListener("DOMContentLoaded",()=>{
const ui=new UI();
const product=new products();
ui.setupAPP();
product.getProduct().then(product=>
    {
        ui.displayProduct(product);
        Storage.saveProduct(product);
    }).then(()=>{
        ui.getBugButtons();
        ui.cartLogic();
    });
});