import { stripe } from "@/lib/stripe";
import { ImageContainer, SuccessContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface SuccessProps {
    customerName: string;
    product: {
        name: string;
        imageUrl: string
    }
}

export default function Success( { customerName, product}: SuccessProps) {
    return (
        <SuccessContainer>
            <h1>Compra Efetuada</h1>

            <ImageContainer>
                <Image src={product.imageUrl} alt = '' width={120} height={110}/>
            </ImageContainer>

            <p>
                Uhuull <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho da sua casa.
            </p>

            <Link href="/">
                Voltar ao catálogo
            </Link>
        </SuccessContainer>
    )
}

export const getServerSideProps: GetServerSideProps = async( { query , params } ) => {

    const sessionId = String(query.session_id)

    const session = await stripe.checkout.sessions.retrieve(sessionId , {
        expand: ['line_items' , 'line_items.data.price.product']
    }) 

    console.log(session.line_items.data)

    const customerName = session.customer_details.name
    const product = session.line_items.data[0].price.product as Stripe.Product // Aqui precisará alterar se for fazer um carrinho

    console.log(product)


    return {
        props: {
            customerName,
            product: {
                name: product.name,
                imageUrl: product.images[0],
            }

        }
    }

}