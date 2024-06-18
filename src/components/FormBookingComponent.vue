<template>
    <div class="booking-form">
        <div class="booking-detailts" v-if="showPaymentForm">
                <div class="form-place">
                    <div class="form-image">
                        <img src="../../src/assets/img/propertie/2092a005-6ff9-4a63-a355-cac12c980dab.webp" alt="Image1">
                    </div>
                    <div class="form-city">
                            <p>{{property.title}}</p>
                            <p>{{property.city}}, {{property.country}} </p>
                            <div class="form-rating">
                                <span class="material-symbols-outlined form-star">star</span>
                                <p> {{property.averageRating}} ({{ property.rating.length }})</p>
                            </div>
                    </div>
                </div>

                <div class="form-dates">
                    <div class="check-in">
                        <p>Check-in</p>
                        <Datepicker
                            v-model="checkInDate"
                            :enable-time-picker="false"
                            :disabled-dates="disabledDates"
                            :min-date="today"
                            :markers="markers"
                            placeholder="Select Check-in Date"
                            width="137px"
                            height="50px"
                        />
                    </div>
                    <div class="vertical-line"></div>
                    <div class="check-out">
                        <p>Check-out</p>
                        <Datepicker
                            v-model="checkOutDate"
                            :enable-time-picker="false"
                            :disabled-dates="disabledDates"
                            :min-date="minCheckoutDate"
                            :max-date="dateOutMax"
                            :markers="markers"
                            placeholder="Select Check-out"
                        />                    
                    </div>                
                </div>

                <div class="form-guests">
                    <p>Guests</p>
                    <input type="number" min="1" :max="property.number_guests_allowed" placeholder="01" v-model="number_guests">
                </div>

                <div class="form-prices">
                    <div class="price-night">
                        <p>€ {{property.price}} x {{ nights }} nights</p>
                        <p>€ {{ total }}</p>
                    </div>

                    <div class="tax">
                        <p>Tax</p>
                        <p>€ {{ total * 0.1 }}</p>
                    </div>
                    <hr>
                    <div class="total">
                        <p>Total</p>
                        <p>€ {{ parseFloat(total)+total*0.1 }}</p>
                    </div>
                </div>

                <div class="form-btn">
                    <button class="bookNow-btn" type="button" @click="showPaymentMethodsForm">Book Now</button>
                </div>
            </div>
            <div v-if="showPaymentMethods">
            <!-- Formulário de método de pagamento -->
            <div class="payment-method-form">
                <div class="title">Choose a payment method</div>
                <div 
                    v-for="(method, index) in paymentMethods" 
                    :key="index" 
                    class="payment-method" 
                    @click="showPaymentDetails(method)"
                >
                    <div class="icon">
                        <!-- Substitua 'methodIcon' pelo caminho para o ícone do método -->
                        <div class="icon">
                            <img :src="method.icon" :alt="method.name">
                        </div>
                    </div>
                    <div class="name">
                        {{ method.description }}
                    </div>
                    <div class="arrow">
                        <span class="material-symbols-outlined form-star">arrow_forward_ios</span>
                    </div>
                </div>
                <div class="form-btn">
                    <button class="bookNow-btn" type="button" @click="cancelBooking" >Cancel</button>
                </div>
            </div>
            
            </div>
            <div v-if="showPaymentDetailsForm" class="payment-details-form">
                <div v-if="selectedPaymentMethod === 'Cash'">
                     <h1>Cash</h1>
                </div>

                <div v-if="selectedPaymentMethod === 'Cryptocurrency'" class="bank-transfer">
                    <h1>Cryptocurrency</h1>
                    <img class="bitcoin-symbol" src="https://pngimg.com/d/bitcoin_PNG35.png" width="250px">
                    <p>You should transfer to the following wallet: ... a total of <b>{{ convertedValue }} ₿</b> Bitcoins</p>
                    <p>Which is equivalent to <b>{{ parseFloat(total)+total*0.1 }} €</b> (real currency value)</p>
                    <button class="bookNow-btn form-btn-confirm-transfer" type="submit" @click="createBooking()">Submit</button>
                </div>

                <div v-if="selectedPaymentMethod === 'Bank Transfer'" class="bank-transfer">
                    <h1>Bank Transfer</h1>
                    <span class="material-symbols-outlined transfer-icon">account_balance</span>
                    <p>Make a transfer in the amount of {{ parseFloat(total)+total*0.1 }} to</p>
                    <div class="iban-container">
                        <p>IBAN: ...</p>
                    </div>
                    <p>After this, confirm your transfer</p>
                    <button class="bookNow-btn form-btn-confirm-transfer" type="submit" @click="createBooking()">Submit</button>
                </div>

                <div v-if="selectedPaymentMethod === 'Credit Card'">
                    <div class="card-container">
                        <div class="card" :class="{ 'flip': cvvFocused }">
                            <div class="front">
                                <div class="header">
                                    <div class="chip">
                                        <img src="https://res.cloudinary.com/dc8ckrwlq/image/upload/v1718672141/payment_methods/chip_abk8yd.png" alt="chip" width="50px">
                                    </div>
                                    <div class="logo">
                                        <img src="https://res.cloudinary.com/dc8ckrwlq/image/upload/v1718658310/payment_methods/credit_card_vtfzx6.png" alt="Logo" width="40px">
                                    </div>
                                </div>
                                <div class="number">{{ formatCardNumber(cardNumber) }}</div>
                                <div class="bottom">
                                    <div class="name">
                                        <div class="label">Name</div>
                                        <div class="value">{{ cardName }}</div>
                                    </div>
                                    <div class="expiry">
                                        <div class="label">Expire Date</div>
                                         <div class="value">{{ expiryMonth }}/{{ expiryYear }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="back">
                                <div class="black-rectangle"></div>
                                <div class="cvv-container">
                                    <div class="label">CVV</div>
                                    <div class="value">{{ cvv }}</div>
                                </div> 
                            </div>
                        </div>
                    </div>

                    <form @submit.prevent style="margin-top: 25px;">
                        <input class="input-345" v-model="cardNumber" placeholder="Card Number" @focus="cvvFocused = false" required maxlength="16" pattern="\d*">
                        <input class="input-345" v-model="cardName" placeholder="Name" @focus="cvvFocused = false" required pattern="[A-Za-z\s]*">
                        <div class="date-cvv-container">
                            <input class="small-input" type="text" placeholder="MM" v-model="expiryMonth" required pattern="(0[1-9]|1[0-2])" maxlength="2" @focus="cvvFocused = false">
                            <input class="small-input" type="text" placeholder="YY" v-model="expiryYear" required pattern="\d{2}" maxlength="2" @focus="cvvFocused = false">
                            <input class="small-input" type="text" placeholder="CVV" v-model="cvv" required pattern="\d{3}" maxlength="3" @focus="cvvFocused = true">
                        </div>
                        <button class="bookNow-btn form-btn-confirm" type="submit" @click="createBooking()">Submit</button>
                    </form>
                </div>
                <div v-if="selectedPaymentMethod === 'PayPal'" class="paypal-form">
                    <div class="logo-paypal">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png" width="250px">
                    </div>
                    <form @submit.prevent class="paypal-inputs">
                        <input class="input-paypal" v-model="email_paypal" placeholder="Email" type="email">
                        <input class="input-paypal" v-model="pass_paypal" type="password" placeholder="Password">
                        <button class="bookNow-btn form-btn-confirm" type="submit" @click="createBooking()">Submit</button>
                    </form>
                </div>
                <div class="form-btn">
                    <button class="bookNow-btn-cancel" type="button" @click="cancelBooking">Cancel</button>
                </div>

            </div>
            <div v-if="bookingSuccess" class="booking-success-message bank-transfer" >
                <h2 style="color: #193D4E; font-weight: 600;">Payment Completed</h2>
                <i class="material-icons" style="font-size: 100px; color: #193D4E;">check_circle</i>
                <p style="color: #193D4E;">Payment Successful</p>
                <p style="color: #193D4E;">Your booking for {{ this.property.title }} from {{ this.checkInDate.toISOString().split('T')[0] }} to {{ this.checkOutDate.toISOString().split('T')[0] }} is confirmed!</p>
                <p style="color: #193D4E; font-weight: 600; position: absolute; bottom: 140px;">Thank you for choosing CozyStay!</p>
                <button class="bookNow-btn form-btn-confirm-transfer" type="button" @click="finishBooking">Confirm</button>
            </div>
        </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import { useToast } from "vue-toastification";
import { useBookingStore } from "@/stores/booking";
    export default {
        setup() {
            // Get toast interface
            const toast = useToast();

            // Make it available inside methods
            return { toast }
        },
        components: {
            Datepicker
        },
        created() {
            this.disableAndMarkDates();
            this.fetchBitcoinRate();
        },
        data() {
            return {
                checkInDate: null,
                checkOutDate: null,
                errorMessage: null,
                bookedDates: null,
                disabledDates: [],
                dateOutMax: null,
                markers: [],	
                nights: 0,
                total: 0,
                showPaymentForm: true,
                showPaymentMethods: false,
                showPaymentDetailsForm: false,
                bookingSuccess: false,
                paymentMethods: this.property.paymentMethod.map(method => ({
                    ...method,
                    icon: this.getIconLink(method.description),
                })),
                selectedMethod: null,
                selectedPaymentMethod: null,
                cardNumber: '',
                cardName: '',
                expiryMonth: '',
                expiryYear: '',
                cvv: '',
                cvvFocused: false,
                convertedValue: null,
                number_guests: 1,
                selectedMethodID: null,
            };
        },
        created() {
            console.log(this.paymentMethods);
            this.disableAndMarkDates();
            this.fetchBitcoinRate();
        },
        props: ['property'],
        computed: {
            today() {
                const today = new Date();
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const day = String(today.getDate()).padStart(2, '0');

                return `${year}-${month}-${day}`;
            },
            minCheckoutDate() {
                if (this.checkInDate) {
                    let date = new Date(this.checkInDate);
                    date.setDate(this.checkInDate.getDate() + 1);
                    return date;
                }
                return null;
            },
        },
        watch: {
            property: {
                handler() {
                this.disableAndMarkDates();
                },
                deep: true,
            },

            checkInDate(newDate, oldDate) {
                if (newDate !== oldDate) {
                    this.checkOutDate=null;
                    this.calculateNights(this.checkInDate, this.checkOutDate);
                    this.calculateTotal(this.property.price);
                }
            },
            checkOutDate(newDate, oldDate) {
                if (newDate !== oldDate) {
                    this.calculateNights(this.checkInDate, this.checkOutDate);
                    this.calculateTotal(this.property.price);
                }
            },
            'property.price'(newPrice, oldPrice) {
                if (newPrice !== oldPrice) {
                    this.calculateTotal(newPrice);
                }
            },

            checkInDate(newDateIn) {
                if (newDateIn) {
                    // Encontra a primeira data reservada após o check-in selecionado
                    const firstBookedDateAfterCheckIn = this.bookedDates
                        .filter((booking) => new Date(booking.checkInDate) > new Date(newDateIn))
                        .map((booking) => new Date(booking.checkInDate))
                        .sort((a, b) => a - b)[0];

                    if (firstBookedDateAfterCheckIn) {
                        // Define a data máxima permitida para checkOutDate como um dia antes da primeira data reservada após o check-in
                        this.dateOutMax = new Date(firstBookedDateAfterCheckIn);
                        this.dateOutMax.setDate(this.dateOutMax.getDate() - 1);
                    } else {
                        // Se não houver reservas após o check-in selecionado, permita que checkOutDate seja qualquer data após o check-in
                        this.dateOutMax = null; // Reseta dateOutMax se não houver checkOutDate
                    }
                }
            },
        },
        methods: {
            validateDates() {
                const checkIn = new Date(this.checkInDate);
                const checkOut = new Date(this.checkOutDate);

                if (checkOut <= checkIn) {
                    this.errorMessage = 'Check-out date must be after the check-in date.';
                } else {
                    this.errorMessage = null;
                }
                this.calculateNights(this.checkInDate, this.checkOutDate);
                this.calculateTotal(this.property.price);
            },
            calculateNights(checkInDate, checkOutDate) {
                this.nights = Math.floor((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));
                if (isNaN(this.nights)) {
                    this.nights = 0;
                }
            },
            calculateTotal(pricePerNight) {
                this.total = this.nights * pricePerNight;
                this.fetchBitcoinRate();
            },
            getDatesInRange(startDate, endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const dateArray = [];

            let currentDate = start;
            while (currentDate <= end) {
                dateArray.push(currentDate.toISOString().split('T')[0]);
                currentDate.setDate(currentDate.getDate() + 1);
            }

            return dateArray;
            },
            isDateInRange(date, startDate, endDate) {
                const target = new Date(date);
                const start = new Date(startDate);
                const end = new Date(endDate);
                return target >= start && target <= end;
            },

            disableAndMarkDates() {
                this.bookedDates = this.property.bookedDates;
                if (!this.bookedDates) {
                    console.log('No booked dates to process.');
                    return;
                }
                console.log('Booked Dates: ' + JSON.stringify(this.bookedDates));

                this.bookedDates.forEach((booking) => {
                    // Aqui está a correção. Deve ser this.getDatesInRange(), não getDatesInRange()
                    const dates = this.getDatesInRange(booking.checkInDate, booking.checkOutDate);
                    this.disabledDates.push(...dates);
                    dates.forEach((date) => {
                    this.markers.push({
                        date: date,
                        type: 'dot',
                        tooltip: [{ text: 'Reserved', color: 'red' }],
                    });
                    });
                });

                console.log('Disabled Dates:', this.disabledDates);
            },
            showPaymentMethodsForm() {
                if (!this.checkInDate || !this.checkOutDate) {
                    this.toast.error('Please select check-in and check-out dates first.');
                    return;
                }
                else if (!sessionStorage.jwt){
                    this.toast.error('Please login first.');
                    return;
                }
                this.showPaymentMethods = true;
                this.showPaymentForm = false;
            },
            showPaymentDetails(method) {
                this.selectPaymentMethod(method);
                this.showPaymentMethods = false;
                this.showPaymentDetailsForm = true;
            },
            getIconLink(methodName) {
                switch (methodName) {
                    case 'Cash':
                        return 'https://res.cloudinary.com/dc8ckrwlq/image/upload/v1718658310/payment_methods/cash_crre82.png';
                    case 'Credit Card':
                        return 'https://res.cloudinary.com/dc8ckrwlq/image/upload/v1718658310/payment_methods/credit_card_vtfzx6.png';
                    case 'PayPal':
                        return 'https://res.cloudinary.com/dc8ckrwlq/image/upload/v1718658310/payment_methods/paypal_suvuut.png';
                    case 'Cryptocurrency':
                        return 'https://res.cloudinary.com/dc8ckrwlq/image/upload/v1718658310/payment_methods/cryptocurrency_qmzlbc.png';
                    case 'Bank Transfer':
                        return 'https://res.cloudinary.com/dc8ckrwlq/image/upload/v1718658310/payment_methods/bank_transfer_jhkuvg.png';
                    default:
                        return '';
                }
            },
            cancelBooking(){
                this.showPaymentForm = true;
                this.showPaymentMethods = false;
                this.showPaymentDetailsForm = false;
            },
            selectPaymentMethod(method) {
                this.selectedPaymentMethod = method.description;
                this.selectedMethodID = method.payment_method_property.payment_method_id;
            },
            formatCardNumber(number) {
                return number.replace(/(\d{4})(?=\d)/g, '$1 ');
            },
            async fetchBitcoinRate() {
                const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
                const data = await response.json();
                console.log(data);
                const rate = data.bpi.USD.rate_float; 
                const total = parseFloat(this.total) + parseFloat(this.total) * 0.1;
                console.log(rate);
                console.log(total);
                this.convertedValue = total / rate; 
                console.log(this.convertedValue);
            },
            async createBooking(){
                const useBooking = useBookingStore();
                const booking = {
                    check_in_date: this.checkInDate.toISOString().split('T')[0],
                    check_out_date: this.checkOutDate.toISOString().split('T')[0],
                    final_price: this.total,
                    property_id: this.property.property_id,
                    number_guests: this.number_guests,
                    payment_method_id: this.selectedMethodID,
                };
                try {
                    const response = await useBooking.createBooking(booking);
                    console.log(response);
                    this.bookingSuccess = true;
                    this.showPaymentDetailsForm = false;
                } catch (error) {
                    return
                }
                
            },
            finishBooking() {
                setTimeout(() => {
                    location.reload();
                }, 2000);
            },
        }
    }
</script>

<style scoped>
.form-place {
    display: flex;
    flex-direction: row;
    gap: 30px;
}

.form-image img{
    border-radius: 20px;
    width: 100px;
    height: 130px;
}

.form-city{
    display: flex;
    flex-direction: column;
    gap: 10px;    
}
.form-city p:first-child {
    font-size: 22px;
    gap: 20px;
}

.form-city p:nth-child(2) {
    font-size: 14px;
}

.form-rating{
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-items: center;
    p {
        font-size: 14px;
    
    }
}

.form-star{
    font-size: 20px;
}

.form-dates {
    margin-top: 5%;
    border: 1px solid #193D4E;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;    
    align-items: center;
    height: 75px;
}

.check-in p, .check-out p {
  font-weight: bold;
  text-align: center;
}

.vertical-line {
    position: absolute;
    border-left: 1px solid #000;
    height: 10%;
}

.form-guests{
    margin-top: 5%;
    border: 1px solid #193D4E;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;    
    align-items: center;
    height: 75px;
    p {
        font-weight: bold;
        text-align: center;
    }
}

.form-btn{
    margin-bottom: 5%;
    margin-top: 7%;
    margin-left: 15%;
    text-align: center;
    position:absolute;
    bottom: 0;
}
.form-btn-confirm{
    margin-bottom: 19%;
    margin-top: 7%;
    margin-left: 15%;
    text-align: center;
    position:absolute;
    bottom: 0;
}

.form-btn-confirm-transfer{
    margin-bottom: 19%;
    margin-left: 1%;
    text-align: center;
    position:absolute;
    bottom: 0;
}

.bookNow-btn {
    color: white;
    background-color: #193D4E;
    border-radius: 40px;
    width: 230px;
    height: 50px;
    font-size: 16px;
    font-weight: lighter;
}

.bookNow-btn-cancel {
    color: #193D4E;
    background-color: white;
    border-radius: 40px;
    width: 230px;
    height: 50px;
    font-size: 16px;
    font-weight: lighter;
    border: 1px solid #193D4E
}

.form-prices {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 5%;
    padding: 10px;
    div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        p {
            font-weight: bold;
        }
    }
    hr {
        width: 100%;
    }
    .total p:nth-child(2) {
        font-weight: bold;
        font-size: 20px;
    }

}

.payment-method {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 330px;
    height: 85px;
    background-color: rgba(165, 232, 226, 0.45);
    padding: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    border-radius: 10px;
}

.payment-method .icon,
.payment-method .name,
.payment-method .arrow {
    flex: 1;
    text-align: center;
}

.icon img{
    max-width: 54px;
    max-height: 54px;
    margin-top: 7px;
}

.title {
    font-family: 'Montserrat', sans-serif;
    font-size: 24px;
    font-weight: 400; /* Regular */
    color: #193D4E;
    margin-bottom: 20px;
}


.card-container {
    perspective: 1000px;
}

.card {
    width: 335px;
    height: 195px;
    position: relative;
    transition: transform 0.8s;
    transform-style: preserve-3d;
}

.card.flip {
    transform: rotateY(180deg);
}

.front, .back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 15px;
    color: #A5E8E2;
    background-color: #193D4E;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
}

.back {
    transform: rotateY(180deg);
    padding: 20px;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

form input {
    display: block;
    margin-bottom: 10px;
    background-color: rgba(165, 232, 226, 0.45);
}

.front {
    /* ... */
    padding: 20px;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: space-between;
}

.logo {
    align-self: flex-end;
}

.number {
    font-size: 24px;
    align-self: center;
}

.bottom {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.name {
    display: flex;
    flex-direction: column;
}

.label {
    font-size: 10px;
    color: #a5e8e27b;
    font-weight: 100;
}

.value {
    font-size: 15px;
}

.expiry {
    font-size: 18px;
}
.cvv {
    font-size: 18px;
    align-self: flex-end;
}

.black-rectangle {
    position: absolute;
    top: 30%;
    left: 0;
    right: 0;
    height: 40px;
    background: black;
}

.cvv-container {
    position: absolute;
    width: 230px;
    height: 25px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    top: 60%;
    left: 25%;
}

.cvv-container .label {
    font-size: 10px;
    color: #A5E8E2;
    font-weight: 100;
}

.cvv-container .value {
    font-size: 15px;
    color: black;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}
.input-345 {
    width: 345px;
    height: 45px;
    border-radius: 5px;
}

.input-paypal {
    width: 345px;
    height: 45px;
    border-radius: 5px;
    background-color:white;
    border: 1px solid #193D4E;
}

.date-cvv-container {
    display: flex;
    justify-content: space-between;
}

.small-input {
    width: 75px;
    height: 45px;
    border-radius: 5px;
}

.paypal-form{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 500px;
    justify-content: space-evenly;
}

.paypal-inputs {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.paypal-inputs .bookNow-btn {
    align-self: flex-start;
}

.logo-paypal{
    align-self: center;
}

.bank-transfer {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.iban-container {
    width: 345px;
    background-color: #A5E8E2;
    padding: 10px;
    margin: 10px 0;
    text-align: center;
    border-radius:10px;
}

.transfer-icon{
    font-size:100px !important;
}
</style>