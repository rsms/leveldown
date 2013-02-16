/* Copyright (c) 2012-2013 LevelDOWN contributors
 * See list at <https://github.com/rvagg/node-leveldown#contributing>
 * MIT +no-false-attribs License <https://github.com/rvagg/node-leveldown/blob/master/LICENSE>
 */

#include <node.h>

#include "leveldown.h"
#include "database.h"
#include "iterator.h"

namespace levelup {

void Init (Handle<Object> target) {
  Database::Init();
  leveldown::Iterator::Init();

  target->Set(v8::String::NewSymbol("leveldown")
      , v8::FunctionTemplate::New(LevelDOWN)->GetFunction());
  target->Set(v8::String::NewSymbol("createIterator")
      , v8::FunctionTemplate::New(CreateIterator)->GetFunction());
}

NODE_MODULE(leveldown, Init)

} // namespace levelup