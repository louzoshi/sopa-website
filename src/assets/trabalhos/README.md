# Prints dos trabalhos

Salve o print de cada site aqui com o **slug** que está em `src/data/content.ts`
(`services.works`) como nome do arquivo:

| slug            | site                       | arquivo esperado          |
| --------------- | -------------------------- | ------------------------- |
| `nogglesboard`  | https://www.nogglesboard.wtf/ | `nogglesboard.png`     |
| `gnars`         | https://gnars.com/         | `gnars.png`               |
| `swaps`         | https://www.swaps.pro/     | `swaps.png`               |
| `slop`          | https://www.slop.fi/       | `slop.png`                |

`.png`, `.jpg`, `.webp` e `.avif` funcionam — o componente acha pelo slug.
Basta soltar o arquivo aqui: nada mais precisa ser editado.

O recorte é **16:10 deitado**, cortado a partir do topo. Um print de janela em
1440×900 já cai certo. Prefira `.webp` — pesa uns 70% menos que `.png`.
