
import { stripe } from "@/lib/stripe"
import { ImageContainer, ProductCointainer, ProductDetails } from "@/styles/pages/product"
import axios from "axios"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"

import Stripe from "stripe"

interface ProductProps {
    product: {

        id: string;
        name: string;
        imageUrl: string;
        price: string;
        description: string;
        defaultPriceId: string;

    }
}


export default function Product({ product }: ProductProps) {
    
    const [isCreatintingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    async function handleBuyProduct() {
        try {

            setIsCreatingCheckoutSession(true)

            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId,

            })

            const { checkoutUrl } = response.data

            window.location.href = checkoutUrl

        } catch (err) {
            // Conectar com uma ferramenta de observabilidade (datadog / sentry)

            setIsCreatingCheckoutSession(false)
            alert('Falha ao redirecionar ao checkout')
        }
    }

    const { isFallback } = useRouter()

    if (isFallback) {
        return <p>Loading ...</p>
    }


    return (
        <ProductCointainer>
            <ImageContainer>
                <Image src={product.imageUrl} alt="" width={520} height={480} />
            </ImageContainer>

            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{product.price}</span>

                <p>{product.description}</p>

                <button disabled = {isCreatintingCheckoutSession} onClick={handleBuyProduct}>
                    Comprar Agora
                </button>
            </ProductDetails>
        </ProductCointainer>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { id: 'prod_O0dP82un22ZPte' } }
        ],

        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {

    const productId = params.id

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    })

    const price = product.default_price as Stripe.Price


    return {
        props: {

            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(price.unit_amount! / 100), // vem em centavos

                description: product.description,
                defaultPriceId: price.id,
            }

        },

        revalidate: 60 * 60 * 1, // 1 hour
    }
}