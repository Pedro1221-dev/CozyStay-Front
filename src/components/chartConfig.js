export const data = {
    labels: ['House','Apartment','Guest House','Hotel'],
    datasets: [
        {
            backgroundColor: ['#193D4E', '#A5E8E2', '#20A89C', '#26726B'],
            data: [52, 25, 15,25]
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
                padding: 25,
                font: {
                    size: 14, // Adjust this value as needed
                    weight: 'bold',
                },
            }

        },
    },
}

  
