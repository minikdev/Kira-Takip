import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    let formattedValue = ''
    if (value.charAt(0) === '0') {
      // 05448881899    0(544)-888-18-99
      formattedValue += '('

      formattedValue += value.charAt(1)
      formattedValue += value.charAt(2)
      formattedValue += value.charAt(3)

      formattedValue += ')-'

      formattedValue += value.charAt(4)
      formattedValue += value.charAt(5)
      formattedValue += value.charAt(6)

      formattedValue += '-'

      formattedValue += value.charAt(7)
      formattedValue += value.charAt(8)

      formattedValue += '-'
      formattedValue += value.charAt(9)
      formattedValue += value.charAt(10)
    } else {
      formattedValue += '('

      formattedValue += value.charAt(0)
      formattedValue += value.charAt(1)
      formattedValue += value.charAt(2)

      formattedValue += ')-'

      formattedValue += value.charAt(3)
      formattedValue += value.charAt(4)
      formattedValue += value.charAt(5)

      formattedValue += '-'

      formattedValue += value.charAt(6)
      formattedValue += value.charAt(7)

      formattedValue += '-'
      formattedValue += value.charAt(8)
      formattedValue += value.charAt(9)
    }
    return formattedValue
  }
}
