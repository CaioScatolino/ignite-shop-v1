import { ImageContainer, SuccessContainer } from "@/styles/pages/success";
import Link from "next/link";

export default function Success() {
    return (
        <SuccessContainer>
            <h1>Compra Efetuada</h1>

            <ImageContainer>

            </ImageContainer>

            <p>
                Uhuull <strong>Caio Scatolino</strong>, sua <strong>Camiseta Mamouse</strong> já está a caminho da sua casa.
            </p>

            <Link href="/">
                Voltar ao catálogo
            </Link>
        </SuccessContainer>
    )
}