let scheduleNext

if (typeof setImmediate != 'undefined') {
  if (!process.nextTick) {
    let npending = 0
    const reset = () => { npending = 0 }
    scheduleNext = function scheduleNext(callback) {
      if (npending == 0) {
        process.nextTick(() => {
          callback()
          process.nextTick(reset)
        })
        ++npending
      } else if (npending < 4) {
        process.nextTick(callback)
        ++npending
      } else {
        setImmediate(callback)
      }
    }
  } else {
    scheduleNext = setImmediate
  }
} else {
  scheduleNext = process.nextTick.bind(process)
}

exports.scheduleNext = scheduleNext
