// Here is a list of the toolbar
// Detail list see https://www.tinymce.com/docs/advanced/editor-control-identifiers/#toolbarcontrols

// const toolbar =
//   'undo redo |  formatselect | bold italic strikethrough forecolor backcolor formatpainter | link image pageembed template| alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists table | removeformat | preview fullscreen'
// toolbar: 'media',

const toolbar = {
  mini: 'bold italic backcolor | alignleft aligncenter alignright alignjustify',
  basic:
    'undo redo | bold italic backcolor removeformat | alignleft aligncenter alignright alignjustify | outdent indent | bullist numlist | link image | preview fullscreen',
  full:
    'undo redo |  formatselect | bold italic strikethrough forecolor backcolor formatpainter removeformat | alignleft aligncenter alignright alignjustify | outdent indent | bullist numlist outdent indent |link image pageembed template | lists table | preview fullscreen'
}

export default toolbar
