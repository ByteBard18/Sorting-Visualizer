def get_merge_sort_animations(array):
    animations = []
    if len(array) <= 1:
        return animations
    auxiliary_array = array.copy()
    merge_sort_helper(array, 0, len(array) - 1, auxiliary_array, animations)
    return animations


def merge_sort_helper(main_array, start_idx, end_idx, auxiliary_array, animations):
    if start_idx == end_idx:
        return
    middle_idx = (start_idx + end_idx) // 2
    merge_sort_helper(auxiliary_array, start_idx, middle_idx, main_array, animations)
    merge_sort_helper(auxiliary_array, middle_idx + 1, end_idx, main_array, animations)
    do_merge(main_array, start_idx, middle_idx, end_idx, auxiliary_array, animations)


def do_merge(main_array, start_idx, middle_idx, end_idx, auxiliary_array, animations):
    k = start_idx
    i = start_idx
    j = middle_idx + 1
    while i <= middle_idx and j <= end_idx:
        animations.append((i, j))  # Animation for comparing values
        animations.append((i, j))  # Revert animation
        if auxiliary_array[i] <= auxiliary_array[j]:
            animations.append((k, auxiliary_array[i]))  # Animation for moving value
            main_array[k] = auxiliary_array[i]
            k += 1
            i += 1
        else:
            animations.append((k, auxiliary_array[j]))  # Animation for moving value
            main_array[k] = auxiliary_array[j]
            k += 1
            j += 1
    while i <= middle_idx:
        animations.append((i, i))  # Animation for comparing values
        animations.append((i, i))  # Revert animation
        animations.append((k, auxiliary_array[i]))  # Animation for moving value
        main_array[k] = auxiliary_array[i]
        k += 1
        i += 1
    while j <= end_idx:
        animations.append((j, j))  # Animation for comparing values
        animations.append((j, j))  # Revert animation
        animations.append((k, auxiliary_array[j]))  # Animation for moving value
        main_array[k] = auxiliary_array[j]
        k += 1
        j += 1


def get_bubble_sort_animations(array):
    animations = []
    if len(array) <= 1:
        return animations
    bubble_sort(array, animations)
    # add array elements in the end to show that the sorting is done
    for i in range(len(array)):
        animations.append((i, array[i]))
    return animations

def bubble_sort(array, animations):
    n = len(array)
    for i in range(n):
        for j in range(0, n-i-1):
            animations.append((j, j+1, -100))  # Animation for comparing values
            animations.append((j, j+1, -100))  # Revert animation
            if array[j] > array[j+1]:
                animations.append((j, array[j+1]))  # Animation for swapping values
                animations.append((j+1, array[j]))  # Animation for swapping values
                array[j], array[j+1] = array[j+1], array[j]

