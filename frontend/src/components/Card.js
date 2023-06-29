import {Card, CardBody, CardDescription, CardImage, BorrowListButton, CardName, BookImage } from "./Styles";


const CardComponent = ({img, title, desc, borrow, author, release, id}) => {

    return (
        <Card>
              <CardImage src={img} />
              <CardBody>
                <CardName>{title}</CardName>
                <CardName>{author}</CardName>
                <CardName>{release}</CardName>
                <CardDescription>
                {desc}
                </CardDescription>
                <BorrowListButton>
                    Borrow
                </BorrowListButton>
              </CardBody>
        </Card>
    )
}

export default CardComponent;