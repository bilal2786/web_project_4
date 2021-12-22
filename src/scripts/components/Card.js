export default class Card {
    constructor(data, templateElement, onImageClick, addingLikes, deletingLikes, openDeleteCardPopup, infoAboutUser) {
        this._name = data.name;
        this._link = data.link;
        this._templateElement = templateElement;
        this._onImageClick = onImageClick;
        this._likes = data.likes
        this._ownerId = data.owner._id
        this._cardId = data._id
        this._addingLikes = addingLikes
        this._deletingLikes = deletingLikes
        this._openDeleteCardPopup = openDeleteCardPopup;
        this._myId = infoAboutUser._profileId
    }



    _checkAmountOfLikes(likes) {

        this._numLikes = likes.length

    }
    _checkingIfUserLikesCard() {

        this._likes.forEach((like) => {
            if (like._id === this._myId) {
                this._cardElement.querySelector(".card__button").classList.add(`card__button_black`)
            }
        })
    }

    _handlePreviewImage() {
        this._onImageClick({ link: this._link, name: this._name });
    }

    _setEventListeners() {
        const cardButton = this._cardElement.querySelector(".card__button");
        const deleteButton = this._cardElement.querySelector('.card__delete-button')
        deleteButton.addEventListener('click', (evt) => { /// deleting cars func !

            this._openDeleteCardPopup(this._cardElement, this._cardId);


        });
        cardButton.addEventListener('click', async (evt) => { /// func for all like buttons !

            if (!cardButton.classList.contains('card__button_black')) {
                try {
                    const likes = await this._addingLikes(this._cardId)
                    if (likes) {
                        this._checkAmountOfLikes(likes)
                        evt.target.classList.add(`card__button_black`);
                        this._cardElement.querySelector(".card__num-likes").style.display = "block"
                        this._cardElement.querySelector(".card__num-likes").textContent = this._numLikes;
                    }
                }
                catch (e) {
                    alert("your like didnt work")
                    console.log('like didnt update', e)
                }

            }
            else {
                try {
                    const likes = await this._deletingLikes(this._cardId);
                    if (likes) {
                        evt.target.classList.remove(`card__button_black`);
                        this._checkAmountOfLikes(likes)
                        this._cardElement.querySelector(".card__num-likes").textContent = this._numLikes;
                    }
                }
                catch (e) {
                    alert("your like didnt work")
                    console.log('like didnt update', e)
                }
                finally {
                    if (this._numLikes === 0) {
                        this._cardElement.querySelector(".card__num-likes").style.display = "none"
                    }
                    else {
                        this._cardElement.querySelector(".card__num-likes").style.display = "block"
                    }
                }
            }
        });



        this._cardElement.querySelector('.card__image').addEventListener('click', () => { ///event for image popup 

            this._handlePreviewImage();

        });
    }

    createCard() {
        this._cardElement = this._templateElement.querySelector(".card").cloneNode(true);
        this._cardElement.querySelector(".card__title").textContent = this._name;
        this._cardElement.querySelector(".card__image").src = this._link;
        this._cardElement.querySelector(".card__image").alt = this._name;
        if (this._likes.length > 0) {
            this._cardElement.querySelector(".card__num-likes").textContent = this._likes.length;
        }
        else {
            this._cardElement.querySelector(".card__num-likes").style.display = "none";
        }
        if (this._ownerId !== this._myId) {
            this._cardElement.querySelector(".card__delete-button").style.display = "none"
        }

        this._setEventListeners();
        this._checkingIfUserLikesCard();

        return this._cardElement;
    }

}