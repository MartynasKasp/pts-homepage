import axios from 'axios';

export const fetchSocials = () => dispatch => {
    axios.get('http://127.0.0.1/api/socials')
        .then(socials => dispatch({
            type: 'FETCH_SOCIALS',
            data: socials
        }));
};

export const createSocial = (socialData) => dispatch => {
    axios.post('http://127.0.0.1/api/socials/add', {
        data: socialData
    })
        .then(social => dispatch({
            type: 'NEW_SOCIAL',
            data: social
        }))


        /*
        .then(response => {
            if(response.data.message) {
                this.setState({ socialLinks:
                        [...this.state.socialLinks, {
                            id: response.data.item.id,
                            name: response.data.item.name,
                            url: response.data.item.url,
                            icon: response.data.item.icon,
                        }]
                })
            } else {
                this.setState({ addNewErrors: {
                        nameError: response.data.nameError,
                        urlError: response.data.urlError,
                        iconError: response.data.iconError,
                    }
                })
            }
        })*/
};