import { Label } from '@radix-ui/react-label'
import React from 'react'
import { Button } from '../ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'

function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText, isBtnDisabled }) {
  
  function renderInputsByComponentType(controlItem) {
    const value = formData[controlItem.name] || ""
    let element = null

    const commonClasses = "bg-gray-900/60 text-white placeholder-gray-400 rounded-xl p-3 focus:ring-yellow-400 focus:border-yellow-400 transition-all"

    switch (controlItem.componentType) {
      case "input":
        element = (
          <Input
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            type={controlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
            className={commonClasses}
          />
        )
        break

      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [controlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className={`w-full ${commonClasses}`}>
              <SelectValue placeholder={controlItem.label} />
            </SelectTrigger>
            <SelectContent className="bg-gray-900/80 text-white rounded-xl">
              {controlItem.options?.map((optionItem) => (
                <SelectItem key={optionItem.id} value={optionItem.id}>
                  {optionItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
        break

      case "textarea":
        element = (
          <Textarea
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
            className={commonClasses}
          />
        )
        break

      default:
        element = (
          <Input
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            type={controlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
            className={commonClasses}
          />
        )
        break
    }

    return element
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-black/80 backdrop-blur-md rounded-xl shadow-xl p-6 space-y-4"
    >
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="text-yellow-400 mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>

      <Button
        disabled={isBtnDisabled}
        type="submit"
        className="mt-4 w-full py-5 text-lg rounded-xl bg-yellow-400 text-black hover:bg-yellow-500 transition-all"
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  )
}

export default CommonForm
