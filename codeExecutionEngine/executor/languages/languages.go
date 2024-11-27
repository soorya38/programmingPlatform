package languages

var supportedLanguages = []string{"javascript", "python"}

func GetSupported() []string {
    return supportedLanguages
}

func IsSupported(language string) bool {
    for _, l := range supportedLanguages {
        if l == language {
            return true
        }
    }
    return false
}