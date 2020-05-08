import { dvi2html } from 'dvi2html'
import { Writable } from 'stream'

export interface DviHTML {
  width: string
  height: string
  content: string
}

export const process = async (url: string) => {
  let html = ''
  const page = new Writable({
    write(chunk, _encoding, callback) {
      html = html + chunk.toString()
      callback()
    }
  })

  const stream = await fetch(url)
    .then(function (response) {
      return response.arrayBuffer()
    })
    .then((b) => Buffer.from(b))
  console.log(stream)

  async function* streamBuffer() {
    yield stream
  }

  const machine = await dvi2html(streamBuffer(), page)
  console.log(machine)

  const div = document.createElement('div')
  div.innerHTML = html
  let highestTop = 0

  for (let i = 0; i < div.children.length; i++) {
    const child = div.children.item(i) as HTMLElement
    if (child && child.style && child.style.top) {
      const top = parseFloat(
        child.style.top.substring(0, child.style.top.length - 2)
      )

      if (top > highestTop) {
        highestTop = top
      }
    }
    if (child.tagName === 'svg') {
      console.log(child)
      const svg = (child as unknown) as SVGElement
      const svgContent = (svg.querySelector(
        'g'
      ) as unknown) as SVGGraphicsElement
      console.log(svg.getBoundingClientRect())
      console.log(svgContent.getBoundingClientRect())
      console.log(svgContent.getBBox())
      const top =
        svg.getBoundingClientRect().top +
        svgContent.getBBox().y +
        svgContent.getBBox().height
      console.log(top)

      if (top > highestTop) {
        highestTop = top
      }
    }
  }
  const result: DviHTML = {
    width: machine.paperwidth.toString() + 'pt',
    height: highestTop + 100 + 'pt', // machine.paperheight.toString() + 'pt',
    content: html
  }

  return result
}
