<template>
    <div v-if="showModal" class="ReviewModal">
        <div class="ReviewModal-content">
            <h1>Rate your Experience!</h1>
            <div class="text">
                <p>We love to hear from you! How is your experience in the  {{ this.propertyName }} ?</p>
            </div>

            <div class="stars">
                <span 
                    class="material-icons star-icon"                    
                    :class="{ 'filled': rating >= 1 }" 
                    @click="setRating(1)"
                >{{ rating >= 1 ? 'star' : 'star_border' }}</span>
                <span 
                    class="material-icons star-icon"                    
                    :class="{ 'filled': rating >= 2 }" 
                    @click="setRating(2)"
                >{{ rating >= 2 ? 'star' : 'star_border' }}</span>
                <span 
                    class="material-icons star-icon"                    
                    :class="{ 'filled': rating >= 3 }" 
                    @click="setRating(3)"
                >{{ rating >= 3 ? 'star' : 'star_border' }}</span>
                <span 
                    class="material-icons star-icon"                    
                    :class="{ 'filled': rating >= 4 }" 
                    @click="setRating(4)"
                >{{ rating >= 4 ? 'star' : 'star_border' }}</span>
                <span 
                    class="material-icons star-icon"                    
                    :class="{ 'filled': rating >= 5 }" 
                    @click="setRating(5)"
                >{{ rating >= 5 ? 'star' : 'star_border' }}</span>
            </div>

            <p class="ReviewCaption">Please rate your experience on a 5-star scale.</p>
            
            <v-textarea label="Write a review" variant="outlined" v-model="reviewText" required>
            </v-textarea>

            <div class="submit-btn">
                <button @click="submitReview" class="submit-btn">Submit</button>
            </div>
           
            <div class="close" @click="closeReviewModal">
                <span class="material-symbols-outlined close-icon">close</span>
            </div>      
        </div>
    </div>
</template>
    
<script>
import { useBookingStore } from "../stores/booking.js";
import { useToast } from "vue-toastification";


export default {
    setup() {
        // Get toast interface
        const toast = useToast();

        // Make it available inside methods
        return { toast }
    },
    data() {
        return {
            rating: 0,
            reviewText: '',
        };
    },
    props: {
        showModal: {
            type: Boolean,
            required: true
        },
        idproperty: {
            type: String,
            required: true
        },
        propertyName: {
            type: String,
            required: true
        }
    }, 
    methods: {
        closeReviewModal() {
            this.$emit('update:showModal', false);
            document.body.style.overflow = '';
            document.body.classList.remove('no-scroll');
        },
        setRating(starNumber) {
            this.rating = this.rating === starNumber ? 0 : starNumber;
        },
        submitReview() {
            if (this.rating && this.reviewText) {
                this.$emit('submit-review', { rating: this.rating, reviewText: this.reviewText });
                this.closeReviewModal();
            } else{
                this.toast.error("Please provide a rating and a comment.");            
            }
        },
    },
    watch: {
        showModal(newVal) {
            if (newVal) {
                document.body.style.overflow = 'hidden';
                document.body.classList.add('no-scroll');
            } else {
                document.body.style.overflow = '';
                document.body.classList.remove('no-scroll');
            }
        }
    }
};
</script>
  
<style>


    .star-icon{
        color: #193D4E;
        font-size: 70px;
        cursor: pointer;
    }

    .star-icon.filled {
        color: #193D4E;
    }

    .stars{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .ReviewCaption{
        margin-bottom: 20px;
        p{
            font-weight: 200;
            display: flex;
        }   
    }

    .text{
        font-size: 18px;
        font-weight: 500;
    }

    .submit-btn{
        background-color: #193D4E;
        color: #FFF;
        width: auto;;
        height: 40px;
        border-radius: 10px;
        font-size: 18px;
        font-weight: 300;
        display: flex;
        align-items: center;
        justify-content: center
    }
  
    /* Modal */
  
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(2px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 55;
    }
  
    .ReviewModal{
      z-index: 10000;
      flex-direction: column;
      align-items: center;
      position: fixed;
      top: 16%; 
      left: 3%;
      background-color: rgba(255, 255, 255, 1);
      border-radius: 40px;
      border: 1px solid #193D4E;
      margin-left: 25%;
      margin-right: 25%;
      padding: 2%;
      width: 50%;
      height: 70%;
      
      overflow: auto;
      h1{          
        display: flex;
        flex-direction: row;
        justify-content: center;
        color: #193D4E;
        margin-top: 2%;
        margin-bottom: 2%;
      }
      p{
        display: flex;
        flex: row;
        justify-content: center;
        color: #193D4E;
        font-weight: 200;
        margin-bottom: 2%;
      }
      b{
        margin-top: 1%;
        margin-bottom: 1%;
      }
    }

    .close-icon{
      font-size: 30px;
      position: absolute;
      right: 50px;
      top: 40px;
      cursor: pointer;
      color: #193D4E;
    }
  
  </style>