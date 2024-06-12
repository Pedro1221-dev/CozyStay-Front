export const data = {
    labels: ['Apartment','Beach House','Cottage'],
    datasets: [
        {
            backgroundColor: ['#193D4E', '#A5E8E2', '#20A89C'],
            data: [60, 25, 15]
        }
    ]
}
  
export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: '   Rented Properties by Category',
            font: {
                size: 18,
                weight: 800,
            },
            color: '#193D4E',
            align: 'start',
            padding: {
                top: 10, 
                bottom: 15,
            },
        },
        legend: {
            display: true, 
            position: 'right',
            labels: {
                padding: 30,
                font: {
                    size: 14, // Adjust this value as needed
                    weight: 'bold',
                },
            }

        },
    },
}

  
