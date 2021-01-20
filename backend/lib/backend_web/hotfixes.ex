# Implement Phoenix.HTML.Safe for unloaded Many-To-Many associations
# because kaffy cannot handle these yet and will crash on empty field
# Ref: https://github.com/aesmail/kaffy/issues/61

defimpl Phoenix.HTML.Safe, for: Ecto.Association.NotLoaded do
  def to_iodata(_), do: "(IGNORE THIS FIELD!)"
end
